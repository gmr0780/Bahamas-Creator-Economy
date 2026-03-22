import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "242Creators - Bahamas Creator Economy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0891B2",
        }}
      >
        <div
          style={{
            fontSize: "280px",
            fontWeight: 900,
            color: "white",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          242
        </div>
        <div
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "white",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginTop: "10px",
          }}
        >
          Creators
        </div>
      </div>
    ),
    { ...size }
  );
}
