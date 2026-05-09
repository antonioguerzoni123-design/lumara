import type { Metadata } from "next";
import { Nunito, DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Lumara — Beleza que simplifica. Cuidado que transforma.",
  description: "Equipamentos profissionais, cuidados capilares e skin care — escolhidos com intenção, pensados para o seu ritual diário.",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="pt"
        className={`${nunito.variable} ${dmSans.variable} h-full`}
      >
        <body
          className="min-h-full flex flex-col"
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
