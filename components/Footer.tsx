"use client";

import React from "react";
import Link from "next/link";
import {
  FacebookOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <span className="text-lg font-bold">📖</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Course App</h3>
            </div>
            <p className="text-gray-600 text-xs mb-4">
              Nền tảng học tập hiện đại giúp bạn chính phục tiếng Anh từ cơ bản
              đến nâng cao với lộ trình rõ ràng, tương tác và cá nhân hóa.
            </p>
            {/* Social Icons */}
            <div className="flex gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 text-sm"
              >
                <FacebookOutlined />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 text-sm"
              >
                <InstagramOutlined />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 text-sm"
              >
                <GithubOutlined />
              </a>
            </div>
          </div>

          {/* Middle Section - Khóa học */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-3">
              Khóa học
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/courses"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Tất cả khóa học
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Sơ cấp
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Trung cấp
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Nâng cao
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section - Tài nguyên */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-3">
              Tài nguyên
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Giảng viên
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Học viên nói gì?
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center py-4 text-xs text-gray-600">
          <p>© 2026 Course App. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Liên hệ hỗ trợ
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Điều khoản
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Bảo mật
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
