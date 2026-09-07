import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteMetadata } from "@/lib/data";

export const socialImageAlt =
  `Aperçu du portfolio de ${siteMetadata.author}, ingénieur DevOps et développeur web`;

export const socialImageSize = {
  width: 1200,
  height: 630,
};

const siteHostname = new URL(siteMetadata.url).hostname;
const profileImageData = await readFile(
  join(process.cwd(), "public/images/profile.png"),
  "base64",
);
const profileImageSrc = `data:image/png;base64,${profileImageData}`;

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#09090b",
          color: "#f4f4f5",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "64px 72px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "rgba(34, 211, 238, 0.14)",
            borderRadius: "9999px",
            display: "flex",
            height: 520,
            left: -260,
            position: "absolute",
            top: -260,
            width: 520,
          }}
        />

        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.22em",
            }}
          >
            {siteMetadata.author.toUpperCase()}
          </div>
          <div
            style={{
              border: "1px solid rgba(103, 232, 249, 0.45)",
              borderRadius: 9999,
              color: "#a5f3fc",
              display: "flex",
              fontSize: 20,
              padding: "10px 20px",
            }}
          >
            {siteHostname}
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 720,
            }}
          >
            <div
              style={{
                color: "#67e8f9",
                display: "flex",
                fontSize: 20,
                letterSpacing: "0.16em",
                marginBottom: 22,
              }}
            >
              DEVOPS · CLOUD · DÉVELOPPEMENT WEB
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 58,
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
              }}
            >
              Construire, automatiser et déployer des expériences web fiables.
            </div>
          </div>

          <div
            style={{
              alignItems: "center",
              background: "rgba(9, 9, 11, 0.82)",
              border: "2px solid rgba(103, 232, 249, 0.45)",
              borderRadius: 9999,
              display: "flex",
              height: 300,
              justifyContent: "center",
              padding: 8,
              width: 300,
            }}
          >
            {/* ImageResponse renders regular image elements, as documented by Next.js. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              height="280"
              src={profileImageSrc}
              style={{
                borderRadius: 9999,
                height: 280,
                objectFit: "cover",
                width: 280,
              }}
              width="280"
            />
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            color: "#a1a1aa",
            display: "flex",
            fontSize: 20,
            position: "relative",
          }}
        >
          Next.js&nbsp;&nbsp;·&nbsp;&nbsp;Docker&nbsp;&nbsp;·&nbsp;&nbsp;CI/CD&nbsp;&nbsp;·&nbsp;&nbsp;Scaleway
        </div>
      </div>
    ),
    socialImageSize,
  );
}
