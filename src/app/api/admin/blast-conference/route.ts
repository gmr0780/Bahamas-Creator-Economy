import { NextResponse } from "next/server";
import { isAuthenticated } from "../../../../lib/auth";
import { Resend } from "resend";
import { prisma } from "../../../../lib/db";

export const dynamic = "force-dynamic";

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Email not configured" }, { status: 500 });
  }
  const resend = new Resend(key);

  try {
    const registrations = await prisma.registration.findMany({
      where: { status: "approved" },
      select: { email: true, fullName: true },
    });

    let sent = 0;
    let failed = 0;

    for (const reg of registrations) {
      try {
        await resend.emails.send({
          from: "242 Creators <noreply@242creators.com>",
          to: reg.email,
          subject: "X is Hosting a Free Masterclass for Bahamian Creators — Register Now",
          text: `Hi ${reg.fullName},

Thank you for being part of Sunday's 242 Influencers & Creative Conference. The momentum hasn't stopped.

Following the conference, X has committed to hosting a FREE Masterclass for Bahamian creators and influencers.

EVENT DETAILS
Date: Thursday, April 17, 2026
Time: 6:00 PM
Format: Online (Virtual)
Host: Jamie Bierman, X (formerly Twitter)

WHAT YOU'LL LEARN
- How to grow your audience on X
- How to monetize your content
- How to build your presence on the platform

WIN LIFETIME X PREMIUM
Creators who attend and sign up to X will have the chance to enter a contest judged by X. The winner receives a lifetime subscription to X Premium — unlocking brand deals, monetization features, and global visibility.

This is exactly what we set out to achieve at Sunday's event. Not just a conversation — but real, tangible opportunities for Bahamian creators.

Register now at: https://242creators.com/x-masterclass

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
      <p style="color:#555;font-size:14px;margin:8px 0 0;">Bahamas Creator Economy Initiative</p>
    </div>

    <p style="font-size:16px;line-height:1.6;">Hi ${escapeHtml(reg.fullName)},</p>
    <p style="font-size:16px;line-height:1.6;">Thank you for being part of Sunday's <strong>242 Influencers &amp; Creative Conference</strong>. The momentum hasn't stopped.</p>
    <p style="font-size:16px;line-height:1.6;">Following the conference, <strong>X has committed to hosting a FREE Masterclass</strong> for Bahamian creators and influencers.</p>

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

    <!-- What you'll learn -->
    <div style="margin:24px 0;">
      <h3 style="font-size:16px;font-weight:700;margin:0 0 12px;color:#1a1a1a;">What You'll Learn</h3>
      <ul style="margin:0;padding-left:20px;color:#333;font-size:14px;line-height:2;">
        <li>How to grow your audience on X</li>
        <li>How to monetize your content</li>
        <li>How to build your presence on the platform</li>
      </ul>
    </div>

    <!-- Contest -->
    <div style="background:#f0fafb;border:1px solid #0891B2;border-radius:8px;padding:24px;margin:24px 0;text-align:center;">
      <h3 style="font-size:16px;font-weight:700;margin:0 0 8px;color:#1a1a1a;">Win Lifetime X Premium</h3>
      <p style="font-size:14px;color:#555;margin:0;">Creators who attend and sign up to X will have the chance to enter a contest judged by X. The winner receives a <strong>lifetime subscription to X Premium</strong> — unlocking brand deals, monetization features, and global visibility.</p>
    </div>

    <!-- Quote -->
    <p style="font-size:15px;line-height:1.6;font-style:italic;color:#555;margin:24px 0;">
      "This is exactly what we set out to achieve at Sunday's event. Not just a conversation — but real, tangible opportunities for Bahamian creators."
    </p>

    <!-- CTA -->
    <div style="text-align:center;margin:32px 0;">
      <a href="https://242creators.com/x-masterclass" style="display:inline-block;background:#0891B2;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:8px;">Register for the X Masterclass</a>
    </div>

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
    console.error("Conference blast error:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
