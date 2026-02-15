import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { DiscourseScript } from "./discourse-script";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/i18n/config";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aurora - The Linux-based ultimate workstation",
  description:
    "The ultimate productivity workstation, stable and streamlined for you.",
  openGraph: {
    type: "website",
    images: ["/aurora_wallpaper_september_2025.png"],
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
        <Toaster />
      </body>
    </html>
  );
}
