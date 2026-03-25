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

  const qrDataUrl = await QRCode.toDataURL(
    `https://242creators.com/checkin/${registrationId}`,
    { width: 200, margin: 1, color: { dark: "#0C1B2A", light: "#FFFFFF" } }
  );

  try {
    await resend.emails.send({
      from: "242 Creators Conference <noreply@242creators.com>",
      to,
      subject: "You're Registered for the 242 Creators Conference",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#0C1B2A;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:#0891B2;font-size:36px;font-weight:900;margin:0;">242</h1>
      <p style="color:#0891B2;font-size:14px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;margin:4px 0 0;">Influencers &amp; Creative Conference</p>
    </div>

    <!-- Main Card -->
    <div style="background:linear-gradient(135deg,#0891B2,#FF6B6B);border-radius:16px;padding:3px;">
      <div style="background:#0C1B2A;border-radius:14px;padding:40px 32px;text-align:center;">
        <p style="color:#0891B2;font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 16px;">Office of the Prime Minister</p>
        <h2 style="color:white;font-size:32px;font-weight:900;margin:0 0 8px;">ACCESS GRANTED</h2>
        <div style="height:1px;background:rgba(255,255,255,0.2);margin:20px 0;"></div>
        <p style="color:white;font-size:24px;font-weight:800;margin:0 0 8px;">${escapeHtml(fullName)}</p>
        <p style="color:#F5E6D0;font-size:14px;margin:0 0 4px;">242 Influencers &amp; Creative Conference</p>
        <p style="color:#F5E6D0;font-size:14px;margin:0 0 20px;">Sunday, March 29, 2026</p>
        <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:20px;padding:8px 20px;">
          <span style="color:white;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Event Pass</span>
        </div>
      </div>
    </div>

    <!-- QR Code -->
    <div style="text-align:center;margin-top:24px;">
      <img src="${qrDataUrl}" alt="Check-in QR Code" width="200" height="200" style="border-radius:12px;" />
      <p style="color:#F5E6D0;font-size:13px;margin:12px 0 0;">Show this QR code at the door</p>
    </div>

    <!-- Event Details -->
    <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;margin-top:24px;">
      <h3 style="color:white;font-size:18px;font-weight:700;margin:0 0 16px;">Event Details</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="color:#0891B2;font-size:13px;font-weight:700;padding:8px 0;width:80px;">DATE</td>
          <td style="color:#F5E6D0;font-size:14px;padding:8px 0;">Sunday, March 29, 2026</td>
        </tr>
        <tr>
          <td style="color:#0891B2;font-size:13px;font-weight:700;padding:8px 0;">TIME</td>
          <td style="color:#F5E6D0;font-size:14px;padding:8px 0;">4:00 PM to 8:00 PM</td>
        </tr>
        <tr>
          <td style="color:#0891B2;font-size:13px;font-weight:700;padding:8px 0;">VENUE</td>
          <td style="color:#F5E6D0;font-size:14px;padding:8px 0;">Baha Mar Convention Center, Nassau</td>
        </tr>
        <tr>
          <td style="color:#0891B2;font-size:13px;font-weight:700;padding:8px 0;">HOST</td>
          <td style="color:#F5E6D0;font-size:14px;padding:8px 0;">Office of the Prime Minister</td>
        </tr>
      </table>
    </div>

    <!-- Highlights -->
    <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;margin-top:16px;">
      <h3 style="color:white;font-size:18px;font-weight:700;margin:0 0 16px;">What to Expect</h3>
      <p style="color:#F5E6D0;font-size:14px;line-height:1.6;margin:0 0 8px;">&#x2022; Keynote by the Prime Minister of The Bahamas</p>
      <p style="color:#F5E6D0;font-size:14px;line-height:1.6;margin:0 0 8px;">&#x2022; Guest Speaker: Prime Minister Mia Mottley of Barbados</p>
      <p style="color:#F5E6D0;font-size:14px;line-height:1.6;margin:0 0 8px;">&#x2022; Panels on brand power, platform strategies, and AI for creators</p>
      <p style="color:#F5E6D0;font-size:14px;line-height:1.6;margin:0 0 8px;">&#x2022; Platform presentations on creator eligibility and monetisation</p>
      <p style="color:#F5E6D0;font-size:14px;line-height:1.6;margin:0;">&#x2022; 242 After Hours: Mix & Mingle Reception</p>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-top:32px;">
      <a href="https://242creators.com/event" style="display:inline-block;background:linear-gradient(135deg,#0891B2,#FF6B6B);color:white;font-size:16px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:30px;">View Full Programme</a>
    </div>

    <!-- Share -->
    <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;margin-top:24px;text-align:center;">
      <h3 style="color:white;font-size:16px;font-weight:700;margin:0 0 8px;">Share the News</h3>
      <p style="color:#F5E6D0;font-size:13px;margin:0 0 16px;">Let your audience know you're attending</p>
      <div>
        <a href="https://twitter.com/intent/tweet?text=I'm%20attending%20the%20242%20Influencers%20%26%20Creative%20Conference%2C%20backed%20by%20the%20Office%20of%20the%20Prime%20Minister%20%F0%9F%87%A7%F0%9F%87%B8%20%23242Creators%20%23BahamasCreatorEconomy&url=https://242creators.com" style="display:inline-block;background:#0C1B2A;border:1px solid rgba(255,255,255,0.2);color:white;font-size:13px;font-weight:700;text-decoration:none;padding:10px 20px;border-radius:20px;margin:4px;">Share on X</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://242creators.com&quote=I'm%20attending%20the%20242%20Influencers%20%26%20Creative%20Conference" style="display:inline-block;background:#1877F2;color:white;font-size:13px;font-weight:700;text-decoration:none;padding:10px 20px;border-radius:20px;margin:4px;">Share on Facebook</a>
        <a href="https://wa.me/?text=I'm%20attending%20the%20242%20Influencers%20%26%20Creative%20Conference%2C%20backed%20by%20the%20Office%20of%20the%20Prime%20Minister%20%F0%9F%87%A7%F0%9F%87%B8%20Register%3A%20https%3A%2F%2F242creators.com%2Fregister" style="display:inline-block;background:#25D366;color:white;font-size:13px;font-weight:700;text-decoration:none;padding:10px 20px;border-radius:20px;margin:4px;">Share on WhatsApp</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:40px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.1);">
      <p style="color:#0891B2;font-size:13px;font-weight:700;margin:0 0 4px;">242Creators.com</p>
      <p style="color:rgba(245,230,208,0.6);font-size:11px;margin:0;">A program of the Office of the Prime Minister, Commonwealth of The Bahamas</p>
      <p style="color:rgba(245,230,208,0.4);font-size:11px;margin:8px 0 0;">Proudly Bahamian Built</p>
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
