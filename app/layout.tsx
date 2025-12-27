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
  icons: {
    icon: "/ADDA.png",
    shortcut: "/ADDA.png",
    apple: "/ADDA.png",
  },
  openGraph: {
    title: "ADDA - Akhnoor District Demand Association",
    description: "Official website of Akhnoor District Demand Association",
    type: "website",
    images: ["/ADDA.png"],
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
          <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-12 mt-16">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {/* About Section */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary-400">
                    ADDA
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Akhnoor District Demand Association - Empowering our region
                    through community development and public service.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary-400">
                    Quick Links
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="/"
                        className="text-gray-300 hover:text-primary-400 transition"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="/about"
                        className="text-gray-300 hover:text-primary-400 transition"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="/about#join-the-movement"
                        className="text-gray-300 hover:text-primary-400 transition"
                      >
                        Get Involved
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary-400">
                    Contact Us
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">📧</span>
                      <a
                        href="mailto:Akhnooradda2026@gmail.com"
                        className="hover:text-primary-400 transition break-all"
                      >
                        Akhnooradda2026@gmail.com
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">📱</span>
                      <a
                        href="tel:+919419190100"
                        className="hover:text-primary-400 transition"
                      >
                        +91 9419190100
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">📷</span>
                      <a
                        href="https://www.instagram.com/adda.2026"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary-400 transition"
                      >
                        @adda.2026
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Copyright */}
              <div className="border-t border-gray-700 pt-6 text-center">
                <p className="text-gray-400">
                  &copy; 2026 ADDA - Akhnoor District Demand Association. All
                  rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
