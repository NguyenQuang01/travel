"use client";

import "./globals.css";
import HeaderClient from "./components/layout/HeaderClient";
import Footer from "./components/layout/FooterClient";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <html lang="en">
      <body>
        {!isAdminRoute && <HeaderClient />}
        {children}
        {!isAdminRoute && <Footer />}

        {/* Google Translate Widget */}
        <div id="google_translate_element"></div>
        <Script
          strategy="afterInteractive"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        />
        <Script
          strategy="afterInteractive"
          id="google-translate-init"
          dangerouslySetInnerHTML={{
            __html: `
                            function googleTranslateElementInit() {
                                new google.translate.TranslateElement({
                                    pageLanguage: 'en',
                                    includedLanguages: 'en,vi,zh-CN',
                                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                                }, 'google_translate_element');
                            }
                        `,
          }}
        />
      </body>
    </html>
  );
}
