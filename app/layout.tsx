import type { Metadata } from "next";
// Removed next/font to avoid turbopack font resolution issues
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Provider } from 'jotai';

// Fonts are loaded via CSS import in globals.css and applied through CSS variables

export const metadata: Metadata = {
  title: "IPHCE RC Discovery Access - Scholarly Resources Discovery Platform",
  description: "Unified access to scholarly resources from library catalogs, institutional repositories, subscription databases, and open-access archives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <Provider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
