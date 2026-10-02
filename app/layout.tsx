import type { Metadata } from "next";

import { siteMetadata } from "@/lib/data";

import "./globals.css";

const themeInitializationScript = `
  (function () {
    var root = document.documentElement;
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var storedTheme = null;

    try {
      storedTheme = window.localStorage.getItem("portfolio-theme");
    } catch {}

    var isDark = storedTheme === "dark" || (storedTheme !== "light" && prefersDark);
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: [
    "portfolio",
    "devops",
    "développeur web",
    "next.js",
    "typescript",
    "tailwindcss",
  ],
  authors: [{ name: siteMetadata.author, url: siteMetadata.url }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: "/",
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
      </head>
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
