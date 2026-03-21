import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0891B2",
          borderRadius: 6,
          color: "#FFFFFF",
          fontSize: 13,
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
