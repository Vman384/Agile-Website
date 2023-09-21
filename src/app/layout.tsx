import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { IAuthRouteProps } from "../../components/AuthRoute";

import "../../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "sunday.com",
    description: "You're daily project tool",
};

export default function RootLayout({ children }: IAuthRouteProps) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
