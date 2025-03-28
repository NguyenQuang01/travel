"use client";

import "./globals.css";
import HeaderClient from "./components/layout/HeaderClient";
import Footer from "./components/layout/FooterClient";
import { usePathname } from "next/navigation";

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
            </body>
        </html>
    );
}
