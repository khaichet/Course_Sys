"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser, getAuthToken } from "@/lib/auth";
import { useSidebar } from "@/lib/SidebarContext";
import {
  DashboardOutlined,
  BookOutlined,
  LineChartOutlined,
  SettingOutlined,
  SearchOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const Sidebar = () => {
  const { isExpanded, setIsExpanded } = useSidebar();
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  React.useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const token = getAuthToken();
    setUserEmail(email || "");
    setIsAuthenticated(!!token);
  }, []);

  const links: SidebarLink[] = [
    { href: "/", label: "Trang chủ", icon: <HomeOutlined /> },
    { href: "/courses", label: "Khóa học của tôi", icon: <BookOutlined /> },
    { href: "/progress", label: "Tiến độ học", icon: <LineChartOutlined /> },
    { href: "/settings", label: "Cài đặt", icon: <SettingOutlined /> },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "/home";
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
    setUserEmail("");
    window.dispatchEvent(new Event("authChange"));
    router.push("/auth/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-screen bg-white text-gray-900 transition-all duration-300 z-40 flex flex-col shadow-lg ${
          isExpanded ? "w-64" : "w-20"
        } overflow-hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {isExpanded && <span className="font-bold text-lg">Menu</span>}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            title={isExpanded ? "Thu gọn" : "Mở rộng"}
          >
            {isExpanded ? (
              <MenuOutlined size={20} />
            ) : (
              <MenuOutlined size={20} />
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pt-4 px-4 py-4">
          {isExpanded && (
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-gray-900 placeholder-gray-400 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-200"
                >
                  <SearchOutlined />
                </button>
              </div>
            </form>
          )}

          {/* Navigation */}
          <nav className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors justify-center md:justify-start ${
                  isActive(link.href)
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                title={!isExpanded ? link.label : undefined}
              >
                <span className="text-lg flex-shrink-0">{link.icon}</span>
                {isExpanded && (
                  <span className="font-medium text-sm">{link.label}</span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* User Section */}
        <div className="border-t border-gray-200 p-4">
          {isAuthenticated && (
            <div>
              {isExpanded ? (
                <>
                  <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {userEmail.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        Demo Student
                      </p>
                      <p className="text-xs text-gray-400">Học viên</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <LogoutOutlined />
                    Đăng xuất
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full hover:bg-red-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center"
                  title="Đăng xuất"
                >
                  <LogoutOutlined className="text-lg" />
                </button>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
