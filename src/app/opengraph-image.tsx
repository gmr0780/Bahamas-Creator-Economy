import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Bahamas Creator Economy Initiative";
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
          background: "linear-gradient(135deg, #0C1B2A 0%, #0891B2 50%, #FF6B6B 100%)",
          padding: "60px",
        }}
      >
        {/* Flag colors bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ height: "8px", background: "#0891B2" }} />
          <div style={{ height: "8px", background: "#FFD700" }} />
          <div style={{ height: "8px", background: "#0891B2" }} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <p
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#0891B2",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            242Creators.com
          </p>
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "white",
              textAlign: "center",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Bahamas Creator
          </h1>
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "white",
              textAlign: "center",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Economy Initiative
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#F5E6D0",
              textAlign: "center",
              maxWidth: "800px",
              marginTop: "10px",
            }}
          >
            Empowering Bahamian digital creators to earn globally
          </p>
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: "40px",
                padding: "12px 30px",
                fontSize: "22px",
                fontWeight: 700,
                color: "white",
              }}
            >
              March 29, 2026
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: "40px",
                padding: "12px 30px",
                fontSize: "22px",
                fontWeight: 700,
                color: "white",
              }}
            >
              Office of the Prime Minister
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
