import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
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
          background: "#0d0c0a",
          borderRadius: "8px",
          border: "2px solid #c9a227",
          color: "#c9a227",
          fontSize: "14px",
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        SL
      </div>
    ),
    { ...size }
  );
}
