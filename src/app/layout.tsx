import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RTC - Remote Telemedicine Center",
  description: "Remote Telemedicine Center 원격 외상 진료 센터 RTC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
