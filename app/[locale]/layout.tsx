import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";
import { DiscourseScript } from "./discourse-script";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/i18n/config";

const geist = Geist({ subsets: ["latin"] });
const siteUrl = new URL("https://getaurora.dev");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Aurora - The Linux-based ultimate workstation",
  description:
    "The ultimate productivity workstation, stable and streamlined for you.",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Aurora - The Linux-based ultimate workstation",
    description:
      "The ultimate productivity workstation, stable and streamlined for you.",
    siteName: "Aurora",
    images: [
      {
        url: "/art/wallpapers/wallpaper-11.png",
        width: 3840,
        height: 2160,
        alt: "Aurora wallpaper by Chandeleer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurora - The Linux-based ultimate workstation",
    description:
      "The ultimate productivity workstation, stable and streamlined for you.",
    images: ["/art/wallpapers/wallpaper-11.png"],
  },
  icons: {
    icon: "/aurora-logo.svg",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <head></head>
      <body className={geist.className}>
        <DiscourseScript />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
