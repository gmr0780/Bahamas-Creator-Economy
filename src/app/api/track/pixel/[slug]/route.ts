import { NextRequest } from "next/server";
import { prisma } from "../../../../../lib/db";

export const dynamic = "force-dynamic";

// 1x1 transparent GIF
const PIXEL = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Log the open in the background — don't delay the pixel response
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const userAgent = request.headers.get("user-agent") || "";

  prisma.emailPixel
    .findUnique({ where: { slug } })
    .then((pixel) => {
      if (pixel) {
        return prisma.emailPixelOpen.create({
          data: { pixelId: pixel.id, ip, userAgent },
        });
      }
    })
    .catch((err) => console.error("Pixel tracking error:", err));

  return new Response(PIXEL, {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
