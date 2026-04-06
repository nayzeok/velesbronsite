import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "VELESBRON — тактические ботинки";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
          position: "relative",
        }}
      >
        {/* Subtle grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 80px)",
            display: "flex",
          }}
        />

        {/* Orange accent line top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #E8722A, #F08030)",
            display: "flex",
          }}
        />

        {/* Brand name */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "0.18em",
            marginBottom: 24,
            display: "flex",
          }}
        >
          VELESBRON
        </div>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 3,
            background: "#E8722A",
            marginBottom: 32,
            display: "flex",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.75)",
            letterSpacing: "0.08em",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          Тактические ботинки из натуральных материалов
        </div>

        {/* Bottom label */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 18,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.12em",
            display: "flex",
          }}
        >
          velesbron.ru
        </div>

        {/* Orange accent line bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "rgba(232,114,42,0.4)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
