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
    const { emails, all } = await request.json();

    let targets: { email: string; fullName: string }[];

    if (all) {
      const registrations = await prisma.registration.findMany({
        where: { status: "approved" },
        select: { email: true, fullName: true },
      });
      targets = registrations;
    } else if (Array.isArray(emails) && emails.length > 0) {
      const registrations = await prisma.registration.findMany({
        where: { email: { in: emails.map((e: string) => e.toLowerCase()) } },
        select: { email: true, fullName: true },
      });
      targets = registrations;
    } else {
      return NextResponse.json({ error: "No targets" }, { status: 400 });
    }

    let sent = 0;
    let failed = 0;

    for (const reg of targets) {
      try {
        await resend.emails.send({
          from: "242 Creators Conference <noreply@242creators.com>",
          to: reg.email,
          subject: "See You Today! Check-In Starts at 3:30 PM",
          text: `Hi ${reg.fullName},\n\nWe are looking forward to having you at the 242 Influencers & Creative Conference today!\n\nIMPORTANT DETAILS:\n- Check-in starts at 3:30 PM\n- Doors close at 4:00 PM\n- Venue: Baha Mar Convention Center, Nassau\n\nPlease have your QR code ready for check-in. If you need to retrieve it:\nhttps://242creators.com/retrieve\n\nDo not share your QR code — it allows a single entry only.\n\nSee you there!\n\n— 242 Creators Conference Team\nOffice of the Prime Minister, Commonwealth of The Bahamas`,
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:system-ui,-apple-system,sans-serif;color:#1a1a1a;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:#0891B2;font-size:32px;font-weight:900;margin:0;">242 Creators Conference</h1>
      <p style="color:#555;font-size:14px;margin:8px 0 0;">Influencers &amp; Creative Conference</p>
    </div>

    <p style="font-size:16px;line-height:1.6;">Hi ${escapeHtml(reg.fullName)},</p>
    <p style="font-size:16px;line-height:1.6;">We are looking forward to having you at the <strong>242 Influencers &amp; Creative Conference</strong> today!</p>

    <div style="background:#f7f7f7;border:1px solid #e0e0e0;border-radius:8px;padding:24px;margin:24px 0;">
      <h3 style="font-size:16px;font-weight:700;margin:0 0 16px;color:#1a1a1a;">Important Details</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="color:#0891B2;font-size:13px;font-weight:700;padding:6px 0;width:100px;">CHECK-IN</td>
          <td style="font-size:14px;padding:6px 0;color:#333;"><strong>3:30 PM</strong></td>
        </tr>
        <tr>
          <td style="color:#0891B2;font-size:13px;font-weight:700;padding:6px 0;">DOORS CLOSE</td>
          <td style="font-size:14px;padding:6px 0;color:#333;"><strong>4:00 PM</strong></td>
        </tr>
        <tr>
          <td style="color:#0891B2;font-size:13px;font-weight:700;padding:6px 0;">VENUE</td>
          <td style="font-size:14px;padding:6px 0;color:#333;">Baha Mar Convention Center, Nassau</td>
        </tr>
      </table>
    </div>

    <p style="font-size:16px;line-height:1.6;">Please have your <strong>QR code</strong> ready for check-in.</p>

    <div style="text-align:center;margin:24px 0;">
      <a href="https://242creators.com/retrieve" style="display:inline-block;background:#0891B2;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:6px;">Retrieve My QR Code</a>
    </div>

    <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:6px;padding:10px 14px;margin:24px 0;">
      <p style="font-size:12px;color:#d97706;font-weight:700;margin:0;">Do not share your QR code with anyone. It allows a single entry only.</p>
    </div>

    <p style="font-size:16px;line-height:1.6;">See you there!</p>

    <div style="text-align:center;margin-top:40px;padding-top:24px;border-top:1px solid #e0e0e0;">
      <p style="font-size:13px;font-weight:700;margin:0 0 4px;color:#0891B2;">242Creators.com</p>
      <p style="color:#999;font-size:11px;margin:0;">Office of the Prime Minister, Commonwealth of The Bahamas</p>
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

    return NextResponse.json({ sent, failed, total: targets.length });
  } catch (error) {
    console.error("Blast error:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
