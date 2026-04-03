import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "../../../../lib/auth";
import { Resend } from "resend";
import { prisma } from "../../../../lib/db";

export const dynamic = "force-dynamic";

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

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
    const body = await request.json();
    const { subject, joinLink, additionalInfo } = body;

    if (!subject) {
      return NextResponse.json({ error: "Subject is required" }, { status: 400 });
    }

    const registrations = await prisma.xMasterclassRegistration.findMany({
      select: { email: true, fullName: true },
    });

    let sent = 0;
    let failed = 0;

    for (const reg of registrations) {
      try {
        await resend.emails.send({
          from: "242 Creators <noreply@242creators.com>",
          to: reg.email,
          subject,
          text: `Hi ${reg.fullName},

${additionalInfo || "Here are the details for the X Masterclass."}

EVENT DETAILS
Date: Thursday, April 17, 2026
Time: 6:00 PM
Format: Online (Virtual)
Host: Jamie Bierman, X (formerly Twitter)

${joinLink ? `JOIN LINK\n${joinLink}\n` : ""}
---
242Creators.com
A program of the Office of the Prime Minister, Commonwealth of The Bahamas
`,
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:system-ui,-apple-system,sans-serif;color:#1a1a1a;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:#0891B2;font-size:32px;font-weight:900;margin:0;">242 Creators</h1>
      <p style="color:#555;font-size:14px;margin:8px 0 0;">X Masterclass for Bahamian Creators</p>
    </div>

    <p style="font-size:16px;line-height:1.6;">Hi ${escapeHtml(reg.fullName)},</p>
    <p style="font-size:16px;line-height:1.6;">${escapeHtml(additionalInfo || "Here are the details for the X Masterclass.")}</p>

    <!-- Event Details -->
    <div style="background:#f7f7f7;border:1px solid #e0e0e0;border-radius:8px;padding:24px;margin:24px 0;">
      <h3 style="font-size:16px;font-weight:700;margin:0 0 16px;color:#1a1a1a;">Event Details</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="color:#0891B2;font-size:13px;font-weight:700;padding:6px 0;width:80px;">DATE</td>
          <td style="font-size:14px;padding:6px 0;color:#333;">Thursday, April 17, 2026</td>
        </tr>
        <tr>
          <td style="color:#0891B2;font-size:13px;font-weight:700;padding:6px 0;">TIME</td>
          <td style="font-size:14px;padding:6px 0;color:#333;">6:00 PM</td>
        </tr>
        <tr>
          <td style="color:#0891B2;font-size:13px;font-weight:700;padding:6px 0;">FORMAT</td>
          <td style="font-size:14px;padding:6px 0;color:#333;">Online (Virtual)</td>
        </tr>
        <tr>
          <td style="color:#0891B2;font-size:13px;font-weight:700;padding:6px 0;">HOST</td>
          <td style="font-size:14px;padding:6px 0;color:#333;">Jamie Bierman, X (formerly Twitter)</td>
        </tr>
      </table>
    </div>

    ${joinLink ? `
    <!-- Join Link -->
    <div style="text-align:center;margin:32px 0;">
      <a href="${escapeHtml(joinLink)}" style="display:inline-block;background:#0891B2;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:8px;">Join the Masterclass</a>
    </div>
    ` : ""}

    <!-- Footer -->
    <div style="text-align:center;margin-top:40px;padding-top:24px;border-top:1px solid #e0e0e0;">
      <p style="font-size:13px;font-weight:700;margin:0 0 4px;color:#0891B2;">242Creators.com</p>
      <p style="color:#999;font-size:11px;margin:0;">A program of the Office of the Prime Minister, Commonwealth of The Bahamas</p>
    </div>
  </div>
</body>
</html>`,
        });
        sent++;
      } catch {
        failed++;
      }
    }

    return NextResponse.json({ sent, failed, total: registrations.length });
  } catch (error) {
    console.error("Masterclass blast error:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
