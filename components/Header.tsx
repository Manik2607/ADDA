"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { user, isAdmin, logout } = useAuth();

  return (
    <header className="bg-primary-600 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold hover:text-primary-100 transition"
          >
            ADDA
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-primary-100 transition">
              Home
            </Link>
            {isAdmin && (
              <Link href="/admin" className="hover:text-primary-100 transition">
                Admin Dashboard
              </Link>
            )}
            {user ? (
              <button
                onClick={logout}
                className="bg-white text-primary-600 px-4 py-2 rounded-md hover:bg-primary-50 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-white text-primary-600 px-4 py-2 rounded-md hover:bg-primary-50 transition"
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
