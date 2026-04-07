"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  FaHome,
  FaGlobeAmericas,
  FaBlog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
  FaPlane,
} from "react-icons/fa";

const destinations = [
  { name: "Istanbul, Turkey", slug: "istanbul", emoji: "🇹🇷" },
  { name: "Dubai, UAE", slug: "dubai", emoji: "🇦🇪" },
  { name: "Baku, Azerbaijan", slug: "azerbaijan", emoji: "🇦🇿" },
  { name: "New York, USA", slug: "usa", emoji: "🇺🇸" },
  { name: "Riyadh, Saudi Arabia", slug: "saudi", emoji: "🇸🇦" },
  { name: "London, UK", slug: "uk", emoji: "🇬🇧" },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token && pathname !== "/admin") {
      router.push("/admin");
    } else {
      setIsAuthenticated(!!token);
    }
    setLoading(false);
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin");
  };

  // If on login page, render children only
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const isActive = (path) => pathname === path;

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex">
      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-50 h-screen transition-all duration-300 bg-[#0d1221] border-r border-[#1a2035] flex flex-col ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${sidebarOpen ? "w-72" : "w-20"}`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-[#1a2035] flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg">
                A
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">ATSAS</h1>
                <p className="text-gray-500 text-xs">Admin Panel</p>
              </div>
            </div>
          )}
          <button
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
              setMobileSidebarOpen(false);
            }}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-[#1a2035]"
          >
            {sidebarOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {/* Dashboard */}
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive("/admin/dashboard")
                  ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30"
                  : "text-gray-400 hover:text-white hover:bg-[#1a2035]"
              }`}
            >
              <FaHome
                size={18}
                className={isActive("/admin/dashboard") ? "text-blue-400" : "group-hover:text-blue-400"}
              />
              {sidebarOpen && <span className="font-medium">Dashboard</span>}
            </Link>

            {/* Registrations/Destinations */}
            <div>
              <button
                onClick={() => setDestinationsOpen(!destinationsOpen)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 group ${
                  pathname.includes("/admin/registrations")
                    ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30"
                    : "text-gray-400 hover:text-white hover:bg-[#1a2035]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FaPlane
                    size={18}
                    className={
                      pathname.includes("/admin/registrations")
                        ? "text-blue-400"
                        : "group-hover:text-blue-400"
                    }
                  />
                  {sidebarOpen && (
                    <span className="font-medium">Registrations</span>
                  )}
                </div>
                {sidebarOpen && (
                  <span className="transition-transform duration-200">
                    {destinationsOpen ? (
                      <FaChevronDown size={12} />
                    ) : (
                      <FaChevronRight size={12} />
                    )}
                  </span>
                )}
              </button>

              {destinationsOpen && sidebarOpen && (
                <div className="ml-6 mt-1 space-y-1 border-l border-[#1a2035] pl-4">
                  {destinations.map((dest) => (
                    <Link
                      key={dest.slug}
                      href={`/admin/registrations/${dest.slug}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        isActive(`/admin/registrations/${dest.slug}`)
                          ? "text-blue-400 bg-blue-600/10"
                          : "text-gray-500 hover:text-white hover:bg-[#1a2035]"
                      }`}
                    >
                      <span>{dest.emoji}</span>
                      <span>{dest.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Blogs */}
            <Link
              href="/admin/blogs"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                pathname.includes("/admin/blogs")
                  ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30"
                  : "text-gray-400 hover:text-white hover:bg-[#1a2035]"
              }`}
            >
              <FaBlog
                size={18}
                className={
                  pathname.includes("/admin/blogs")
                    ? "text-blue-400"
                    : "group-hover:text-blue-400"
                }
              />
              {sidebarOpen && <span className="font-medium">Blogs</span>}
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#1a2035]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-600/10 transition-all duration-200 w-full"
          >
            <FaSignOutAlt size={18} />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-[#0d1221] border-b border-[#1a2035] flex items-center justify-between px-6 sticky top-0 z-30">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-[#1a2035]"
          >
            <FaBars size={20} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-white text-sm font-medium">Admin</p>
                <p className="text-gray-500 text-xs">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
