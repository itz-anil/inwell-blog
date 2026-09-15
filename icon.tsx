import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0b10",
          borderRadius: 14
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 38,
            color: "#8b7bff",
            fontStyle: "italic"
          }}
        >
          I
        </span>
      </div>
    ),
    { ...size }
  );
}
