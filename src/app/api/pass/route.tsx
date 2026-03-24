import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "Creator";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1080,
          height: 1920,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #0C1B2A 0%, #0C1B2A 30%, #0891B2 65%, #FF6B6B 100%)",
          padding: "100px 60px 80px",
        }}
      >
        {/* Bahamian flag colors — clean horizontal stripes */}
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
          <div style={{ height: "16px", background: "#00ABC0" }} />
          <div style={{ height: "16px", background: "#FFD700" }} />
          <div style={{ height: "16px", background: "#00ABC0" }} />
        </div>

        {/* OPM */}
        <p
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Office of the Prime Minister
        </p>

        {/* 242 */}
        <p
          style={{
            fontSize: 180,
            fontWeight: 900,
            color: "#0891B2",
            lineHeight: 1,
            margin: "40px 0 0",
          }}
        >
          242
        </p>

        {/* Event name */}
        <p
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            letterSpacing: "0.05em",
            margin: "10px 0 0",
          }}
        >
          INFLUENCERS & CREATIVE
        </p>
        <p
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            letterSpacing: "0.05em",
            margin: "0",
          }}
        >
          CONFERENCE
        </p>

        {/* Divider */}
        <div
          style={{
            width: 120,
            height: 3,
            background: "linear-gradient(90deg, #0891B2, #FF6B6B)",
            borderRadius: 2,
            margin: "50px 0",
          }}
        />

        {/* ACCESS GRANTED */}
        <p
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            letterSpacing: "0.08em",
            margin: 0,
          }}
        >
          ACCESS GRANTED
        </p>

        {/* Name */}
        <p
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            margin: "30px 0 0",
          }}
        >
          {name}
        </p>

        {/* Event Pass badge */}
        <div
          style={{
            display: "flex",
            background: "rgba(255,255,255,0.15)",
            borderRadius: 40,
            padding: "14px 40px",
            marginTop: 40,
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Event Pass
          </span>
        </div>

        {/* Date + Location */}
        <p
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "rgba(255,255,255,0.8)",
            textAlign: "center",
            margin: "60px 0 0",
          }}
        >
          Sunday, March 29, 2026
        </p>
        <p
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            margin: "8px 0 0",
          }}
        >
          Nassau, The Bahamas
        </p>

        {/* Website */}
        <p
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#0891B2",
            letterSpacing: "0.15em",
            margin: "60px 0 0",
          }}
        >
          242CREATORS.COM
        </p>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
