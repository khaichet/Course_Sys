import React from "react";
import { searchAndFilterCourses } from "@/lib/courseService";
import CourseCard from "@/components/CourseCard";
import Link from "next/link";

interface CoursesPageProps {
  searchParams: Promise<{ page?: string; search?: string; level?: string }>;
}

const CoursesPage = async ({ searchParams }: CoursesPageProps) => {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const searchQuery = params.search || "";
  const level = params.level || "All";

  const { courses, total, pageSize, totalPages } = await searchAndFilterCourses(
    searchQuery,
    level,
    page
  );

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(
        <Link
          key={1}
          href="/courses?page=1"
          className="px-4 py-2 rounded-lg font-medium transition bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          1
        </Link>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis-start" className="px-2 py-2">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Link
          key={i}
          href={`/courses?page=${i}`}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            page === i
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {i}
        </Link>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis-end" className="px-2 py-2">
            ...
          </span>
        );
      }
      pages.push(
        <Link
          key={totalPages}
          href={`/courses?page=${totalPages}`}
          className="px-4 py-2 rounded-lg font-medium transition bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          {totalPages}
        </Link>
      );
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
            Danh Sách Khóa Học
          </h1>

          <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-6">
            <div className="flex flex-col gap-3 md:gap-4">
              <form
                method="GET"
                className="flex flex-col lg:flex-row gap-2 md:gap-3"
              >
                <input
                  type="text"
                  name="search"
                  placeholder="Tìm kiếm khóa học..."
                  defaultValue={searchQuery}
                  className="flex-1 px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base min-h-[44px]"
                />

                <select
                  name="level"
                  defaultValue={level}
                  className="px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm md:text-base min-h-[44px]"
                >
                  <option value="All">Tất cả trình độ</option>
                  <option value="S">Sơ cấp (S)</option>
                  <option value="Pres">Trung cấp (Pres)</option>
                  <option value="TC">Trên trung cấp (TC)</option>
                  <option value="MTC">Cao cấp (MTC)</option>
                </select>

                <div className="flex gap-2 md:gap-3">
                  <button
                    type="submit"
                    className="flex-1 lg:flex-initial px-4 md:px-6 py-2 md:py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition text-sm md:text-base min-h-[44px]"
                  >
                    Tìm
                  </button>

                  {(searchQuery || level !== "All") && (
                    <Link
                      href="/courses"
                      className="flex-1 lg:flex-initial px-4 py-2 md:py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-medium transition text-sm md:text-base min-h-[44px] flex items-center justify-center"
                    >
                      Xóa
                    </Link>
                  )}
                </div>
              </form>
            </div>
          </div>

          <p className="text-sm md:text-base text-gray-600">
            {total > 0
              ? `Tìm thấy ${total} khóa học`
              : "Không tìm thấy khóa học nào"}
            {(searchQuery || level !== "All") && (
              <span className="ml-2 text-xs md:text-sm">
                (tìm kiếm: "{searchQuery}"{" "}
                {level !== "All" && `- trình độ: ${level}`})
              </span>
            )}
          </p>
        </div>

        {courses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-1 md:gap-2 flex-wrap mt-6 md:mt-8">
                {page > 1 ? (
                  <Link
                    href={`/courses?page=${page - 1}${
                      searchQuery ? `&search=${searchQuery}` : ""
                    }${level !== "All" ? `&level=${level}` : ""}`}
                    className="px-3 md:px-4 py-2 md:py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition text-sm md:text-base min-h-[44px] flex items-center"
                  >
                    ← Trước
                  </Link>
                ) : (
                  <button
                    disabled
                    className="px-3 md:px-4 py-2 md:py-3 bg-gray-200 text-gray-400 rounded-lg opacity-50 cursor-not-allowed text-sm md:text-base min-h-[44px] flex items-center"
                  >
                    ← Trước
                  </button>
                )}

                {Array.from({ length: totalPages }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Link
                      key={pageNum}
                      href={`/courses?page=${pageNum}${
                        searchQuery ? `&search=${searchQuery}` : ""
                      }${level !== "All" ? `&level=${level}` : ""}`}
                      className={`px-3 md:px-4 py-2 md:py-3 rounded-lg font-medium transition text-sm md:text-base min-h-[44px] flex items-center ${
                        page === pageNum
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      {pageNum}
                    </Link>
                  );
                }).slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))}

                {page < totalPages ? (
                  <Link
                    href={`/courses?page=${page + 1}${
                      searchQuery ? `&search=${searchQuery}` : ""
                    }${level !== "All" ? `&level=${level}` : ""}`}
                    className="px-3 md:px-4 py-2 md:py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition text-sm md:text-base min-h-[44px] flex items-center"
                  >
                    Tiếp →
                  </Link>
                ) : (
                  <button
                    disabled
                    className="px-3 md:px-4 py-2 md:py-3 bg-gray-200 text-gray-400 rounded-lg opacity-50 cursor-not-allowed text-sm md:text-base min-h-[44px] flex items-center"
                  >
                    Tiếp →
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Không có khóa học nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
