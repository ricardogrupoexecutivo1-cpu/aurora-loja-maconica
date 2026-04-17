import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aurora Loja Maçônica",
  description:
    "Sistema institucional premium da Aurora Loja Maçônica com gestão segura, área dos irmãos, memorial, agenda, documentos e estrutura protegida para uso em celular e PC.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#174d2b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        style={{
          minHeight: "100vh",
          margin: 0,
          background: "#f7fbf8",
          color: "#102418",
        }}
      >
        {children}
      </body>
    </html>
  );
}