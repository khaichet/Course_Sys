"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { logoutUser, getAuthToken } from "@/lib/auth";

const Navbar = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = React.useState("");
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const updateAuthState = React.useCallback(() => {
    const email = localStorage.getItem("userEmail");
    const token = getAuthToken();
    setUserEmail(email || "");
    setIsAuthenticated(!!token);
  }, []);

  React.useEffect(() => {
    updateAuthState();

    const handleStorageChange = () => {
      updateAuthState();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleStorageChange);
    };
  }, [updateAuthState]);

  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
    setUserEmail("");
    window.dispatchEvent(new Event("authChange"));
    router.push("/auth/login");
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  return (
    <nav className="bg-yellow-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
        <div className="text-xl sm:text-2xl font-bold flex-shrink-0">
          <a href="/" className="hover:text-yellow-100 transition">
            Course App
          </a>
        </div>

        <div className="hidden md:flex items-center">
          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              <a
                href="/courses"
                className="hover:text-yellow-100 transition font-medium"
              >
                Khóa Học
              </a>
              <div className="flex items-center gap-4 pl-6 border-l border-yellow-500">
                <span className="text-sm truncate max-w-[150px]">
                  {userEmail}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition min-h-[44px]"
                >
                  Đăng Xuất
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-medium transition min-h-[44px]"
            >
              Đăng Nhập
            </button>
          )}
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col gap-1 items-end justify-center min-h-[44px] min-w-[44px]"
          aria-label="Toggle menu"
        >
          <div
            className={`w-6 h-0.5 bg-white transition-all ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <div
            className={`w-6 h-0.5 bg-white transition-all ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <div
            className={`w-6 h-0.5 bg-white transition-all ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-yellow-700 px-4 py-4 border-t border-yellow-500">
          {isAuthenticated ? (
            <div className="space-y-4">
              <a
                href="/courses"
                className="block py-2 px-3 hover:bg-yellow-600 rounded-lg transition font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Khóa Học
              </a>
              <div className="py-2 px-3 border-t border-yellow-500">
                <p className="text-sm mb-3 truncate">Email: {userEmail}</p>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition min-h-[44px]"
                >
                  Đăng Xuất
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                handleLogin();
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition min-h-[44px]"
            >
              Đăng Nhập
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
