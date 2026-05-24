import { ImageResponse } from "next/og";

import { siteConfig } from "@/data/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background:
            "linear-gradient(135deg, #0d0c0a 0%, #1a1510 45%, #0d0c0a 100%)",
          color: "#f5f0e8",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              border: "2px solid #c9a227",
              background: "rgba(201, 162, 39, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: 700,
              color: "#c9a227",
            }}
          >
            SL
          </div>
          <span style={{ fontSize: "22px", opacity: 0.7 }}>Portfolio</span>
        </div>
        <div style={{ fontSize: "64px", fontWeight: 700, lineHeight: 1.1 }}>
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: "20px",
            fontSize: "32px",
            color: "#c9a227",
            maxWidth: "900px",
          }}
        >
          {siteConfig.role}
        </div>
        <div
          style={{
            marginTop: "28px",
            fontSize: "24px",
            opacity: 0.75,
            maxWidth: "880px",
            lineHeight: 1.4,
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
