import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio DevOps / DevWeb",
  description:
    "Portfolio personnel moderne pour présenter un profil DevOps et développement web.",
  keywords: [
    "portfolio",
    "devops",
    "développeur web",
    "next.js",
    "typescript",
    "tailwindcss",
  ],
  authors: [{ name: "Ton Nom" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
