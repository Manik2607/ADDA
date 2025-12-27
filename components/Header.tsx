"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const { user, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white border-b-4 border-primary-600 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl md:text-4xl font-bold hover:opacity-90 transition flex items-center gap-2 md:gap-4"
            onClick={closeMenu}
          >
            <img
              src="/ADDA.png"
              alt="ADDA Logo"
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
            />
            <span className="bg-gradient-to-r from-[#1e3a8a] via-[#2563eb] to-[#059669] bg-clip-text text-transparent">
              ADDA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-navy-700 hover:text-primary-600 transition font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-navy-700 hover:text-primary-600 transition font-medium"
            >
              About
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

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-navy-700 hover:text-primary-600 transition p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 space-y-3">
            <Link
              href="/"
              className="block text-navy-700 hover:text-primary-600 transition font-medium py-2"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-navy-700 hover:text-primary-600 transition font-medium py-2"
              onClick={closeMenu}
            >
              About
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className="block text-navy-700 hover:text-primary-600 transition font-medium py-2"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            )}
            {user ? (
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="w-full bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition shadow-md font-medium"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="block text-center bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition shadow-md font-medium"
                onClick={closeMenu}
              >
                Admin Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
