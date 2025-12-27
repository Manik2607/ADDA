"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { user, isAdmin, logout } = useAuth();

  return (
    <header className="bg-white border-b-4 border-primary-600 shadow-md">
      <nav className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl font-bold text-navy-800 hover:text-primary-600 transition flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              A
            </div>
            <span>ADDA</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-navy-700 hover:text-primary-600 transition font-medium"
            >
              Home
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className="text-navy-700 hover:text-primary-600 transition font-medium"
              >
                Dashboard
              </Link>
            )}
            {user ? (
              <button
                onClick={logout}
                className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition shadow-md font-medium"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition shadow-md font-medium"
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
