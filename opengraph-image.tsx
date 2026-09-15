import { ImageResponse } from "next/og";

export const alt = "Inkwell — Essays on design, craft and the future";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(160deg, #0a0b10 0%, #15172a 60%, #1c1436 100%)",
          color: "#eef0f6"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 30,
            color: "#8b7bff",
            marginBottom: 28
          }}
        >
          <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>✒️ Inkwell</span>
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 58,
            lineHeight: 1.15,
            maxWidth: 920,
            color: "#f4f3fb"
          }}
        >
          Essays on design, craft and the future.
        </div>
        <div style={{ marginTop: 26, fontSize: 22, color: "#9aa0b4", maxWidth: 760 }}>
          A premium multi-author publication — written slowly, for people who read the same way.
        </div>
      </div>
    ),
    { ...size }
  );
}
