"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Providers } from "./provider";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <Providers>
          <LayoutContent>{children}</LayoutContent>
        </Providers></body>
    </html>

  );
}

// Separate component that uses useSession
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(true);

  // Don't render sidebar if user is not logged in
  if (!session) {
    return (
      <div className="min-h-screen bg-gray-100">
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white p-4 transition-all duration-300 ${open ? "w-64" : "w-16"
          } md:relative md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"
          } fixed left-0 top-0 h-full z-50 md:z-auto`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="mb-6 px-2 py-1 bg-gray-700 rounded md:block"
        >
          <span className="md:hidden">☰</span>
          <span className="hidden md:inline">{open ? <>☰</> : <>☰</>}</span>
        </button>

        <nav className="flex flex-col justify-between">
          {/* Menu items */}
          <div className="flex flex-col gap-2">
            <Link href="/home" className="hover:bg-gray-700 p-2 rounded flex items-center justify-center">
              <span className={`${open ? "inline" : "hidden md:hidden"}`}>Home</span>
              <span className={`${!open ? "block" : "hidden"} text-center`}>🏠</span>
            </Link>

            <Link href="/history" className="hover:bg-gray-700 p-2 rounded flex items-center justify-center">
              <span className={`${open ? "inline" : "hidden md:hidden"}`}>History</span>
              <span className={`${!open ? "block" : "hidden"} text-center`}>📜</span>
            </Link>

            <Link href="/switch-role" className="hover:bg-gray-700 p-2 rounded flex items-center justify-center">
              <span className={`${open ? "inline" : "hidden md:hidden"}`}>Switch Role</span>
              <span className={`${!open ? "block" : "hidden"} text-center`}>🔄</span>
            </Link>
          </div>
          {/* Logout button always at bottom */}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-600 hover:bg-red-500 p-2 rounded flex items-center justify-center cursor-pointer mt-4 w-full"
          >
            <span className={`${open ? "inline" : "hidden md:hidden"}`}>Logout</span>
            <span className={`${!open ? "block" : "hidden"} text-center`}>🚪</span>
          </button>

        </nav>

      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
