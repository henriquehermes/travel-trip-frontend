import type { Metadata } from "next";
import { Providers } from "./providers";
import "./global.css";

export const metadata: Metadata = {
    manifest: "/manifest.json",
    title: "Travel Bug",
    description: "Travel Bug",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
