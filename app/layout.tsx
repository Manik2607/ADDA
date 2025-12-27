import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ADDA - Akhnoor District Demand Association",
  description:
    "Official website of Akhnoor District Demand Association - Stay updated with latest news, events, and announcements.",
  keywords: "ADDA, Akhnoor, District, Demand Association, News, Events",
  authors: [{ name: "ADDA" }],
  openGraph: {
    title: "ADDA - Akhnoor District Demand Association",
    description: "Official website of Akhnoor District Demand Association",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <footer className="bg-gray-800 text-white py-8 mt-16">
            <div className="container mx-auto px-4 text-center">
              <p>
                &copy; {new Date().getFullYear()} ADDA - Akhnoor District Demand
                Association. All rights reserved.
              </p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
