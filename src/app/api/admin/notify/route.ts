import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "../../../../lib/auth";
import { Resend } from "resend";
import { prisma } from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Email not configured" }, { status: 500 });
  }
  const resend = new Resend(key);

  try {
    const { emails } = await request.json();
    if (!Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json({ error: "No emails provided" }, { status: 400 });
    }

    const results: { email: string; status: string }[] = [];

    for (const email of emails) {
      const reg = await prisma.registration.findFirst({
        where: { email: { equals: email, mode: "insensitive" } },
        select: { fullName: true, email: true },
      });

      if (!reg) {
        results.push({ email, status: "not found" });
        continue;
      }

      try {
        await resend.emails.send({
          from: "242 Creators Conference <noreply@242creators.com>",
          to: reg.email,
          subject: "Your Email Was Corrected - 242 Creators Conference",
          text: `Hi ${reg.fullName},\n\nOur AI agent noticed that the email address you entered during registration had a small typo, so we corrected it automatically to make sure you receive all event communications.\n\nYour corrected email: ${reg.email}\n\nNo action is needed on your part — your registration is confirmed and your QR code is ready.\n\nIf you haven't received your check-in QR code, you can retrieve it here:\nhttps://242creators.com/retrieve\n\nSee you on March 29!\n\n— 242 Creators Conference Team\nOffice of the Prime Minister, Commonwealth of The Bahamas`,
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:system-ui,-apple-system,sans-serif;color:#1a1a1a;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:#0891B2;font-size:32px;font-weight:900;margin:0;">242 Creators Conference</h1>
    </div>
    <p style="font-size:16px;line-height:1.6;">Hi ${reg.fullName},</p>
    <p style="font-size:16px;line-height:1.6;">Our AI agent noticed that the email address you entered during registration had a small typo, so we corrected it automatically to make sure you receive all event communications.</p>
    <div style="background:#f0fafb;border:1px solid #0891B2;border-radius:8px;padding:16px 20px;margin:24px 0;">
      <p style="font-size:14px;color:#555;margin:0 0 4px;">Your corrected email:</p>
      <p style="font-size:16px;font-weight:700;color:#0891B2;margin:0;">${reg.email}</p>
    </div>
    <p style="font-size:16px;line-height:1.6;">No action is needed on your part — your registration is confirmed and your QR code is ready.</p>
    <p style="font-size:16px;line-height:1.6;">If you haven't received your check-in QR code, you can retrieve it here:</p>
    <div style="text-align:center;margin:24px 0;">
      <a href="https://242creators.com/retrieve" style="display:inline-block;background:#0891B2;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:6px;">Retrieve My QR Code</a>
    </div>
    <p style="font-size:16px;line-height:1.6;">See you on March 29!</p>
    <div style="text-align:center;margin-top:40px;padding-top:24px;border-top:1px solid #e0e0e0;">
      <p style="font-size:13px;font-weight:700;margin:0 0 4px;color:#0891B2;">242Creators.com</p>
      <p style="color:#999;font-size:11px;margin:0;">Office of the Prime Minister, Commonwealth of The Bahamas</p>
    </div>
  </div>
</body>
</html>`,
        });
        results.push({ email: reg.email, status: "sent" });
      } catch {
        results.push({ email: reg.email, status: "failed" });
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Notify error:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
