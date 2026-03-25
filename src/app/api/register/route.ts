import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/db";
import { sendConfirmationEmail } from "../../../lib/email";
import { rateLimit } from "../../../lib/rate-limit";

export const dynamic = "force-dynamic";

const ALLOWED_PLATFORMS = ["YouTube", "TikTok", "Instagram", "Twitch", "X/Twitter", "Facebook", "Other"];
const ALLOWED_FOLLOWERS = ["Under 1K", "1K-10K", "10K-50K", "50K-100K", "100K-500K", "500K+"];
const ALLOWED_NICHES = ["Finance/Investing", "Business", "Technology", "Entertainment", "Lifestyle", "Food/Travel", "Education", "Music", "Sports", "Other"];
const ALLOWED_MONETIZATION = ["Not yet earning", "Earning under $500/mo", "Earning $500-2000/mo", "Earning $2000+/mo"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = 200;

function trimStr(val: unknown): string {
  return typeof val === "string" ? val.trim().slice(0, MAX_LENGTH) : "";
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (!rateLimit(ip, 10, 15 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many registration attempts. Try again later." }, { status: 429 });
    }

    const body = await request.json();

    // Trim all string inputs
    body.fullName = trimStr(body.fullName);
    body.email = trimStr(body.email);
    body.phone = trimStr(body.phone);
    body.platform = trimStr(body.platform);
    body.handle = trimStr(body.handle);
    body.followers = trimStr(body.followers);
    body.niche = trimStr(body.niche);
    body.monetization = trimStr(body.monetization);

    // Validate required fields
    if (!body.fullName || !body.email) {
      return NextResponse.json({ error: "Full name and email are required." }, { status: 400 });
    }

    // Validate email format
    if (!EMAIL_REGEX.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    // Validate platform
    if (body.platform && !ALLOWED_PLATFORMS.includes(body.platform)) {
      return NextResponse.json({ error: "Invalid platform." }, { status: 400 });
    }

    // Validate followers
    if (body.followers && !ALLOWED_FOLLOWERS.includes(body.followers)) {
      return NextResponse.json({ error: "Invalid followers range." }, { status: 400 });
    }

    // Validate niche
    if (body.niche && !ALLOWED_NICHES.includes(body.niche)) {
      return NextResponse.json({ error: "Invalid niche." }, { status: 400 });
    }

    // Validate monetization
    if (body.monetization && !ALLOWED_MONETIZATION.includes(body.monetization)) {
      return NextResponse.json({ error: "Invalid monetization value." }, { status: 400 });
    }

    // Validate topics
    if (body.topics !== undefined && body.topics !== null) {
      if (!Array.isArray(body.topics) || !body.topics.every((t: unknown) => typeof t === "string")) {
        return NextResponse.json({ error: "Topics must be an array of strings." }, { status: 400 });
      }
      body.topics = body.topics.slice(0, 20).map((t: string) => t.trim().slice(0, MAX_LENGTH));
    }

    // Check if registration is open
    const openSetting = await prisma.setting.findUnique({
      where: { key: "registration_open" },
    });
    const isOpen = (openSetting?.value ?? "true") === "true";

    if (!isOpen) {
      return NextResponse.json(
        { error: "Registration is currently closed." },
        { status: 400 }
      );
    }

    // Check cap + duplicate + create atomically in a transaction
    const capSetting = await prisma.setting.findUnique({
      where: { key: "registration_cap" },
    });
    const cap = parseInt(capSetting?.value ?? "400", 10);

    let registration;
    let count: number;
    try {
      const result = await prisma.$transaction(async (tx) => {
        const currentCount = await tx.registration.count({ where: { source: "website" } });
        if (currentCount >= cap) {
          throw new Error("FULL");
        }

        const existing = await tx.registration.findUnique({
          where: { email: body.email },
        });
        if (existing) {
          throw new Error("DUPLICATE");
        }

        const created = await tx.registration.create({
          data: {
            fullName: body.fullName,
            email: body.email,
            phone: body.phone,
            platform: body.platform,
            handle: body.handle,
            followers: body.followers,
            niche: body.niche,
            monetization: body.monetization,
            topics: body.topics ?? [],
            status: "pending",
          },
        });

        return { registration: created, count: currentCount };
      }, { isolationLevel: "Serializable" });

      registration = result.registration;
      count = result.count;
    } catch (txError: unknown) {
      if (txError instanceof Error) {
        if (txError.message === "FULL") {
          return NextResponse.json(
            { error: "Registration is full. All spots have been taken." },
            { status: 400 }
          );
        }
        if (txError.message === "DUPLICATE") {
          return NextResponse.json(
            { error: "This email has already been registered." },
            { status: 400 }
          );
        }
      }
      // Handle race condition: unique constraint violation on email
      if (
        txError &&
        typeof txError === "object" &&
        "code" in txError &&
        (txError as { code: string }).code === "P2002"
      ) {
        return NextResponse.json(
          { error: "This email has already been registered." },
          { status: 400 }
        );
      }
      throw txError;
    }

    // Send confirmation email (non-blocking)
    sendConfirmationEmail({
      to: body.email,
      fullName: body.fullName,
      registrationId: registration.id,
    }).catch((err) => console.error("Email failed:", err));

    return NextResponse.json({
      success: true,
      registrationId: registration.id,
      count: count + 1,
      cap,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration." },
      { status: 500 }
    );
  }
}
