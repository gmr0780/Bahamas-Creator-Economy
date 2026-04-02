import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { sendMasterclassConfirmationEmail } from "../../../../lib/email";
import { rateLimit } from "../../../../lib/rate-limit";

export const dynamic = "force-dynamic";

const ALLOWED_ISLANDS = [
  "Nassau / New Providence",
  "Grand Bahama",
  "Abaco",
  "Eleuthera",
  "Exuma",
  "Andros",
  "Long Island",
  "Cat Island",
  "Bimini",
  "Inagua",
  "Berry Islands",
  "Acklins",
  "Crooked Island",
  "Mayaguana",
  "Rum Cay",
  "San Salvador",
  "Ragged Island",
  "Other",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = 200;

function trimStr(val: unknown): string {
  return typeof val === "string" ? val.trim().slice(0, MAX_LENGTH) : "";
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (!rateLimit(ip, 10, 15 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
    }

    const body = await request.json();

    const fullName = trimStr(body.fullName);
    const email = trimStr(body.email).toLowerCase();
    const phone = trimStr(body.phone);
    const island = trimStr(body.island);
    let xHandle = trimStr(body.xHandle);

    // Validate required fields
    if (!fullName || !email || !phone || !island || !xHandle) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    if (!ALLOWED_ISLANDS.includes(island)) {
      return NextResponse.json({ error: "Invalid island selection." }, { status: 400 });
    }

    // Normalize X handle — ensure it starts with @
    if (!xHandle.startsWith("@")) {
      xHandle = `@${xHandle}`;
    }

    // Check if registration is open
    const openSetting = await prisma.setting.findUnique({
      where: { key: "xMasterclassRegistrationOpen" },
    });
    if ((openSetting?.value ?? "false") !== "true") {
      return NextResponse.json(
        { error: "Registration is not yet open." },
        { status: 400 }
      );
    }

    // Check duplicate + create
    let registration;
    try {
      const result = await prisma.$transaction(async (tx) => {
        const existing = await tx.xMasterclassRegistration.findUnique({
          where: { email },
        });
        if (existing) {
          throw new Error("DUPLICATE");
        }

        const created = await tx.xMasterclassRegistration.create({
          data: { fullName, email, phone, island, xHandle },
        });

        return created;
      }, { isolationLevel: "Serializable" });

      registration = result;
    } catch (txError: unknown) {
      if (txError instanceof Error && txError.message === "DUPLICATE") {
        return NextResponse.json(
          { error: "This email has already been registered." },
          { status: 400 }
        );
      }
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
    sendMasterclassConfirmationEmail({
      to: email,
      fullName,
    }).catch((err) => console.error("Email failed:", err));

    return NextResponse.json({
      success: true,
      registrationId: registration.id,
    });
  } catch (error) {
    console.error("X Masterclass registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration." },
      { status: 500 }
    );
  }
}
