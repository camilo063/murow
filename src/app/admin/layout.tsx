"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import SessionWrapper from "@/components/admin/SessionWrapper";
import { sidebarGroups } from "@/components/admin/section-config";

function AdminLayoutInner({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage && status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router, isLoginPage]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Login page renders without admin chrome
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1426]">
        <div className="flex flex-col items-center gap-3">
          <svg
            className="animate-spin h-8 w-8 text-cyan-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span className="text-white text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-[#0B1426] text-white flex flex-col
          transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-lg font-bold tracking-tight">PAYWL</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-4">
          {sidebarGroups.map((group) => (
            <div key={group.group}>
              <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                {group.group}
              </p>
              <div className="space-y-0.5">
                {group.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`
                      block px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${
                        isActive(link.href)
                          ? "bg-cyan-500/20 text-cyan-400"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-[#0B1426]">
              Admin PAYWL
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:inline">
              {session?.user?.name || session?.user?.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SessionWrapper>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SessionWrapper>
  );
}
