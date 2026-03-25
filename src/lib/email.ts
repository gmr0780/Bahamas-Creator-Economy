import { Resend } from "resend";
import QRCode from "qrcode";

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY not set, emails will not be sent");
    return null;
  }
  return new Resend(key);
}

export async function sendConfirmationEmail({
  to,
  fullName,
  registrationId,
}: {
  to: string;
  fullName: string;
  registrationId: string;
}) {
  const resend = getResend();
  if (!resend) return { success: false, error: "Email not configured" };

  const checkinUrl = `https://242creators.com/checkin/${registrationId}`;

  const qrBuffer = await QRCode.toBuffer(checkinUrl, {
    width: 200,
    margin: 1,
    color: { dark: "#0C1B2A", light: "#FFFFFF" },
  });

  const plainText = `242 Influencers & Creative Conference - Registration Confirmed

Hello ${fullName},

Your registration for the 242 Influencers & Creative Conference has been confirmed.

EVENT DETAILS
Date: Sunday, March 29, 2026
Time: 4:00 PM to 8:00 PM
Venue: Baha Mar Convention Center, Nassau
Host: Office of the Prime Minister

YOUR CHECK-IN LINK
${checkinUrl}

Please present this link or QR code at the door for check-in.

WHAT TO EXPECT
- Keynote by the Prime Minister of The Bahamas
- Guest Speaker: Prime Minister Mia Mottley of Barbados
- Panels on brand power, platform strategies, and AI for creators
- Platform presentations on creator eligibility and monetisation
- 242 After Hours: Mix & Mingle Reception

View the full programme: https://242creators.com/event

---
242Creators.com
A program of the Office of the Prime Minister, Commonwealth of The Bahamas
`;

  try {
    await resend.emails.send({
      from: "242 Creators Conference <noreply@242creators.com>",
      to,
      subject: "Registration Confirmed - 242 Creators Conference, March 29",
      text: plainText,
      headers: {
        "X-Entity-Ref-ID": registrationId,
        "List-Unsubscribe": "<mailto:noreply@242creators.com?subject=unsubscribe>",
      },
      attachments: [
        {
          filename: "checkin-qr.png",
          content: qrBuffer,
          contentType: "image/png",
          contentId: "checkin-qr",
        },
      ],
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:system-ui,-apple-system,sans-serif;color:#1a1a1a;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:#0891B2;font-size:32px;font-weight:900;margin:0;">242 Creators Conference</h1>
      <p style="color:#555;font-size:14px;margin:8px 0 0;">Influencers &amp; Creative Conference</p>
    </div>

    <!-- Greeting -->
    <p style="font-size:16px;line-height:1.6;margin:0 0 24px;">Hello ${escapeHtml(fullName)},</p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 24px;">Your registration for the <strong>242 Influencers &amp; Creative Conference</strong> has been confirmed. We look forward to seeing you there.</p>

    <!-- Event Details -->
    <div style="background:#f7f7f7;border:1px solid #e0e0e0;border-radius:8px;padding:24px;margin:24px 0;">
      <h3 style="font-size:16px;font-weight:700;margin:0 0 16px;color:#1a1a1a;">Event Details</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="color:#0891B2;font-size:13px;font-weight:700;padding:6px 0;width:70px;">DATE</td>
          <td style="font-size:14px;padding:6px 0;color:#333;">Sunday, March 29, 2026</td>
        </tr>
        <tr>
          <td style="color:#0891B2;font-size:13px;font-weight:700;padding:6px 0;">TIME</td>
          <td style="font-size:14px;padding:6px 0;color:#333;">4:00 PM to 8:00 PM</td>
        </tr>
        <tr>
          <td style="color:#0891B2;font-size:13px;font-weight:700;padding:6px 0;">VENUE</td>
          <td style="font-size:14px;padding:6px 0;color:#333;">Baha Mar Convention Center, Nassau</td>
        </tr>
        <tr>
          <td style="color:#0891B2;font-size:13px;font-weight:700;padding:6px 0;">HOST</td>
          <td style="font-size:14px;padding:6px 0;color:#333;">Office of the Prime Minister</td>
        </tr>
      </table>
    </div>

    <!-- Check-in -->
    <div style="background:#f0fafb;border:1px solid #0891B2;border-radius:8px;padding:24px;margin:24px 0;text-align:center;">
      <h3 style="font-size:16px;font-weight:700;margin:0 0 8px;color:#1a1a1a;">Your Check-In</h3>
      <p style="font-size:14px;color:#555;margin:0 0 16px;">Present this QR code at the door, or use the link below.</p>
      <p style="margin:0 0 16px;"><img src="cid:checkin-qr" alt="Check-in QR Code" width="180" height="180" style="border-radius:8px;border:1px solid #e0e0e0;" /></p>
      <a href="${checkinUrl}" style="display:inline-block;background:#0891B2;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:6px;">Open Check-In Link</a>
    </div>

    <!-- What to Expect -->
    <div style="margin:24px 0;">
      <h3 style="font-size:16px;font-weight:700;margin:0 0 12px;color:#1a1a1a;">What to Expect</h3>
      <ul style="margin:0;padding-left:20px;color:#333;font-size:14px;line-height:2;">
        <li>Keynote by the Prime Minister of The Bahamas</li>
        <li>Guest Speaker: Prime Minister Mia Mottley of Barbados</li>
        <li>Panels on brand power, platform strategies, and AI for creators</li>
        <li>Platform presentations on creator eligibility and monetisation</li>
        <li>242 After Hours: Mix &amp; Mingle Reception</li>
      </ul>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin:32px 0;">
      <a href="https://242creators.com/event" style="display:inline-block;background:#0891B2;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:6px;">View Full Programme</a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:40px;padding-top:24px;border-top:1px solid #e0e0e0;">
      <p style="font-size:13px;font-weight:700;margin:0 0 4px;color:#0891B2;">242Creators.com</p>
      <p style="color:#999;font-size:11px;margin:0;">A program of the Office of the Prime Minister, Commonwealth of The Bahamas</p>
    </div>
  </div>
</body>
</html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Email send failed:", error);
    return { success: false, error };
  }
}
