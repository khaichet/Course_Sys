"use client";

import React, { useState } from "react";
import { getAuthToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import {
  EyeOutlined,
  UserOutlined,
  CameraOutlined,
  LockOutlined,
} from "@ant-design/icons";

interface UserInfo {
  name: string;
  email: string;
  headline?: string;
  bio?: string;
  completionPercentage: number;
}

type TabType = "about" | "profile" | "photo" | "security";

const ProfilePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("about");
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "Demo Student",
    email: "student@example.com",
    headline: "Chưa có headline",
    bio: "Hoàn thiện hồ sơ để tăng độ tin cậy và thu hút học viên",
    completionPercentage: 13,
  });

  React.useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {userInfo.name}
            </h2>
            <p className="text-gray-500 italic mb-6">{userInfo.headline}</p>
            <p className="text-gray-600 mb-4">{userInfo.email}</p>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Độ hoàn thiện hồ sơ
                </h3>
                <span className="text-orange-500 font-semibold">
                  {userInfo.completionPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-black h-2 rounded-full"
                  style={{ width: `${userInfo.completionPercentage}%` }}
                ></div>
              </div>
              <p className="text-gray-600 text-sm mt-2">
                Hoàn thiện hồ sơ để tăng độ tin cậy và thu hút học viên
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📄</div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">
                    About
                  </h3>
                  <p className="text-gray-600 text-center">
                    Chưa có thông tin giới thiệu
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Thêm một đoạn giới thiệu về bản thân để học viên hiểu rõ hơn
                    về bạn
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🔗</div>
                <div>
                  <h3 className="text-xl font-semibold text-green-600">
                    Links
                  </h3>
                </div>
              </div>
            </div>
          </div>
        );
      case "profile":
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên
                </label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={userInfo.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headline
                </label>
                <input
                  type="text"
                  value={userInfo.headline}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, headline: e.target.value })
                  }
                  placeholder="Thêm một dòng tiêu đề ngắn"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={userInfo.bio}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, bio: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Lưu thay đổi
              </button>
            </form>
          </div>
        );
      case "photo":
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Photo</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <div className="text-4xl mb-4">📸</div>
              <p className="text-gray-600 mb-4">
                Kéo và thả ảnh hoặc click để chọn
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Chọn ảnh
              </button>
            </div>
          </div>
        );
      case "security":
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Account security
            </h2>
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Thay đổi mật khẩu
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Cập nhật mật khẩu của bạn để bảo vệ tài khoản
                </p>
                <button className="text-blue-600 hover:underline">
                  Thay đổi mật khẩu
                </button>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Xác thực hai yếu tố
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Bật xác thực hai yếu tố để tăng cường bảo mật
                </p>
                <button className="text-blue-600 hover:underline">
                  Bật xác thực
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-0">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Bảng điều khiển
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Chọn tab để cập nhật hồ sơ của bạn
            </p>

            {/* User Card */}
            <div className="border-t border-gray-200 py-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-gray-600 mb-4">
                  {userInfo.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-gray-900 text-center">
                  {userInfo.name}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {userInfo.email}
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("about")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                    activeTab === "about"
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <EyeOutlined /> Public profile
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                    activeTab === "profile"
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <UserOutlined /> Profile
                </button>
                <button
                  onClick={() => setActiveTab("photo")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                    activeTab === "photo"
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <CameraOutlined /> Photo
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                    activeTab === "security"
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <LockOutlined /> Account security
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
