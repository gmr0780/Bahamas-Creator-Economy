import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0891B2",
          borderRadius: 36,
          color: "#FFFFFF",
          fontSize: 72,
          fontWeight: 900,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        242
      </div>
    ),
    { ...size }
  );
}
