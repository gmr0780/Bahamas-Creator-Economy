import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { prisma } from "../../../../lib/db";
import { rateLimit } from "../../../../lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!rateLimit(ip, 20, 15 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const { id } = await params;

  try {
    // Verify the registration exists
    const registration = await prisma.registration.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!registration) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const checkinUrl = `https://242creators.com/checkin/${id}`;
    const buffer = await QRCode.toBuffer(checkinUrl, {
      width: 400,
      margin: 2,
      color: { dark: "#0C1B2A", light: "#FFFFFF" },
    });

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="242-checkin-qr.png"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("QR generation error:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
