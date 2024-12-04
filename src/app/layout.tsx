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
        {/* favicon 설정 */}
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        
        {/* Open Graph 메타 태그 */}
        <meta property="og:title" content="RTC - Remote Telemedicine Center" />
        <meta property="og:description" content="원격 외상 진료 센터 RTC - Remote Telemedicine Center" />
        <meta property="og:image" content="https://www.remotetraumacenter.site/favicon.ico" />
        <meta property="og:url" content="https://www.remotetraumacenter.site" />
        <meta property="og:type" content="website" />

        {/* Twitter Card 메타 태그 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RTC - Remote Telemedicine Center" />
        <meta name="twitter:description" content="원격 외상 진료 센터 RTC - Remote Telemedicine Center" />
        <meta name="twitter:image" content="https://www.remotetraumacenter.site/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
