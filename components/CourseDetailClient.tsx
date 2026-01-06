"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Course } from "@/lib/types";
import {
  calculateCourseProgress,
  getCourseLessonStatuses,
  getCourseProgress,
} from "@/lib/progressService";
import { motion } from "framer-motion";

interface CourseDetailClientProps {
  course: Course;
}

const CourseDetailClient: React.FC<CourseDetailClientProps> = ({ course }) => {
  const [progress, setProgress] = useState(0);
  const [courseStatus, setCourseStatus] = useState<
    "not-started" | "in-progress" | "not-completed" | "completed"
  >("not-started");
  const [lessonStatuses, setLessonStatuses] = useState<
    Record<string, "not-started" | "in-progress" | "completed">
  >({});

  useEffect(() => {
    const lessonIds = course.lessons.map((l) => l.id);
    const statuses = getCourseLessonStatuses(course.id, lessonIds);
    setLessonStatuses(statuses);

    const courseProgress = calculateCourseProgress(
      course.id,
      course.totalLessons
    );
    setProgress(courseProgress);

    const courseProgressData = getCourseProgress(course.id);
    setCourseStatus(courseProgressData?.status || "not-started");
  }, [course.id, course.lessons, course.totalLessons]);

  useEffect(() => {
    const handleProgressUpdate = () => {
      const lessonIds = course.lessons.map((l) => l.id);
      const statuses = getCourseLessonStatuses(course.id, lessonIds);
      setLessonStatuses(statuses);

      const courseProgress = calculateCourseProgress(
        course.id,
        course.totalLessons
      );
      setProgress(courseProgress);

      const courseProgressData = getCourseProgress(course.id);
      setCourseStatus(courseProgressData?.status || "not-started");
    };

    window.addEventListener("progressUpdated", handleProgressUpdate);
    return () =>
      window.removeEventListener("progressUpdated", handleProgressUpdate);
  }, [course.id, course.lessons, course.totalLessons]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "S":
        return "bg-green-100 text-green-800";
      case "Pres":
        return "bg-blue-100 text-blue-800";
      case "TC":
        return "bg-yellow-100 text-yellow-800";
      case "MTC":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelLabel = (level: string) => {
    const labels: { [key: string]: string } = {
      S: "Sơ cấp",
      Pres: "Trung cấp",
      TC: "Trên trung cấp",
      MTC: "Cao cấp",
    };
    return labels[level] || level;
  };

  const getStatusBadge = (
    status: "not-started" | "in-progress" | "not-completed" | "completed"
  ) => {
    const statusMap: {
      [key: string]: { bg: string; text: string; label: string };
    } = {
      "not-started": {
        bg: "bg-gray-100",
        text: "text-gray-800",
        label: "Chưa bắt đầu",
      },
      "not-completed": {
        bg: "bg-orange-100",
        text: "text-orange-800",
        label: "Chưa hoàn thành",
      },
      "in-progress": {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "Đang học",
      },
      completed: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Hoàn thành",
      },
    };
    return statusMap[status] || statusMap["not-started"];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-300"
        style={{
          backgroundImage: `url(${course.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 px-3 sm:px-4 py-2 rounded-lg transition font-medium text-sm sm:text-base min-h-[44px] sm:min-h-[48px] justify-center"
          >
            ← Quay lại
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex gap-2 mb-3 sm:mb-4 flex-wrap">
                  <span className="text-xs sm:text-sm font-semibold text-white bg-gray-800 bg-opacity-70 px-2 sm:px-3 py-1 rounded whitespace-nowrap">
                    {course.kindOfCourse}
                  </span>
                  <span
                    className={`text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded ${getLevelColor(
                      course.level
                    )}`}
                  >
                    {getLevelLabel(course.level)}
                  </span>
                  {courseStatus !== "not-started" && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded ${
                        getStatusBadge(courseStatus).bg
                      } ${getStatusBadge(courseStatus).text}`}
                    >
                      {courseStatus === "completed" && "✓ Hoàn thành"}
                      {courseStatus === "not-completed" && "◐ Chưa hoàn thành"}
                    </motion.span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2 break-words">
                  {course.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Description */}
            <section className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                Mô Tả Khóa Học
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                {course.description}
              </p>
            </section>

            {/* Lessons List */}
            <section className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                Danh Sách Bài Học ({course.lessons.length})
              </h2>

              {course.lessons.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {course.lessons.map((lesson, index) => {
                    const lessonStatus =
                      lessonStatuses[lesson.id] || "not-started";
                    const isCompleted = lessonStatus === "completed";
                    const isInProgress = lessonStatus === "in-progress";
                    return (
                      <Link
                        key={lesson.id}
                        href={`/courses/${course.id}/lessons/${lesson.id}`}
                      >
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          whileHover={{ x: 4 }}
                          className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md hover:border-blue-300 transition flex gap-3 sm:gap-4 cursor-pointer min-h-[44px] sm:min-h-[48px] justify-start items-start"
                        >
                          {/* Lesson Order Circle */}
                          <motion.div
                            animate={{
                              scale: isCompleted ? 1.1 : 1,
                              backgroundColor: isCompleted
                                ? "#10b981"
                                : isInProgress
                                ? "#3b82f6"
                                : "#6b7280",
                            }}
                            transition={{ duration: 0.3 }}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full text-white flex items-center justify-center font-bold text-sm sm:text-lg flex-shrink-0 min-h-[44px] sm:min-h-[48px] min-w-[44px] sm:min-w-[48px]"
                          >
                            {isCompleted ? "✓" : lesson.order}
                          </motion.div>

                          {/* Lesson Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2">
                              <div className="flex-1 min-w-0">
                                <h3
                                  className={`text-base sm:text-lg font-semibold break-words ${
                                    isCompleted
                                      ? "line-through text-gray-500"
                                      : "text-gray-800"
                                  }`}
                                >
                                  {lesson.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                                  {lesson.description}
                                </p>
                              </div>
                              <motion.div
                                animate={{
                                  scale: isCompleted || isInProgress ? 1.05 : 1,
                                }}
                                transition={{ duration: 0.3 }}
                                className="flex-shrink-0"
                              >
                                {isCompleted ? (
                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium whitespace-nowrap"
                                  >
                                    ✓ Hoàn thành
                                  </motion.span>
                                ) : isInProgress ? (
                                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium whitespace-nowrap">
                                    ◐ Đang học
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium whitespace-nowrap">
                                    ○ Chưa bắt đầu
                                  </span>
                                )}
                              </motion.div>
                            </div>

                            {/* Lesson Duration */}
                            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 flex-wrap">
                              <span>⏱️ {lesson.duration} phút</span>
                              {lesson.url && (
                                <span className="text-blue-500 font-medium">
                                  Xem chi tiết →
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8 text-sm sm:text-base">
                  Khóa học này chưa có bài học nào. Sắp ra mắt!
                </p>
              )}
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 sticky top-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
                Thông Tin Khóa Học
              </h3>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    Tiến Độ Học
                  </span>
                  <span className="text-sm sm:text-base font-bold text-gray-800">
                    {progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <div className="text-xs sm:text-sm text-gray-600">
                    Tổng Bài Học
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {course.totalLessons}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <div className="text-xs sm:text-sm text-gray-600">
                    Bài Hoàn Thành
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">
                    {
                      Object.values(lessonStatuses).filter(
                        (s) => s === "completed"
                      ).length
                    }
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <div className="text-xs sm:text-sm text-gray-600">
                    Loại Khóa Học
                  </div>
                  <div className="text-base sm:text-lg font-bold text-gray-800">
                    {course.kindOfCourse}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <div className="text-xs sm:text-sm text-gray-600">
                    Trình Độ
                  </div>
                  <div className="text-base sm:text-lg font-bold text-gray-800">
                    {getLevelLabel(course.level)}
                  </div>
                </div>
              </div>

              <motion.button
                onClick={() => {
                  if (course.lessons.length > 0) {
                    const firstLesson = course.lessons[0];
                    window.location.href = `/courses/${course.id}/lessons/${firstLesson.id}`;
                  }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition min-h-[44px] sm:min-h-[48px] flex items-center justify-center text-sm sm:text-base"
              >
                {progress === 100
                  ? "Ôn Tập Khóa Học"
                  : progress > 0
                  ? "Tiếp Tục Học"
                  : "Bắt Đầu Học Ngay"}
              </motion.button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailClient;
