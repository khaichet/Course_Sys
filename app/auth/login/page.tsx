"use client";

import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!password.trim()) {
      newErrors.password = "Password không được để trống";
    } else if (password.length < 6) {
      newErrors.password = "Password phải có ít nhất 6 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await loginUser(email, password);
      window.dispatchEvent(new Event("authChange"));
      router.push("/courses");
    } catch (error) {
      setGeneralError(
        error instanceof Error ? error.message : "Đăng nhập thất bại"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    email.trim() && password.trim() && !Object.keys(errors).length;

  const fillDemoAccount = () => {
    setEmail("admin@gmail.com");
    setPassword("123456");
    setErrors({});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Đăng Nhập</h1>

        {/* Demo Account Info */}
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 font-medium mb-2">
            📝 Tài khoản demo:
          </p>
          <p className="text-sm text-blue-700">
            Email: <span className="font-mono">admin@gmail.com</span>
          </p>
          <p className="text-sm text-blue-700 mb-3">
            Password: <span className="font-mono">123456</span>
          </p>
          <button
            type="button"
            onClick={fillDemoAccount}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded transition"
          >
            Tự động điền thông tin demo
          </button>
        </div>

        {generalError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              } ${isLoading ? "bg-gray-50 cursor-not-allowed" : ""}`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              } ${isLoading ? "bg-gray-50 cursor-not-allowed" : ""}`}
              placeholder="••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed text-gray-700"
                : isFormValid
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-400 cursor-not-allowed text-gray-700"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Đang đăng nhập...</span>
              </>
            ) : (
              "Đăng Nhập"
            )}
          </Button>
        </form>

        {isLoading && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Vui lòng chờ...</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
              <div className="bg-blue-500 h-1 rounded-full animate-pulse w-3/4"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
