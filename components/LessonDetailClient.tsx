"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Course, Lesson } from "@/lib/types";
import { updateLessonStatus, getLessonStatus } from "@/lib/progressService";

interface LessonDetailClientProps {
  course: Course;
  lesson: Lesson;
  courseId: string;
}

const LessonDetailClient: React.FC<LessonDetailClientProps> = ({
  course,
  lesson,
  courseId,
}) => {
  const router = useRouter();
  const [status, setStatus] = useState<
    "not-started" | "in-progress" | "completed"
  >("not-started");
  const [isMarking, setIsMarking] = useState(false);

  useEffect(() => {
    const savedStatus = getLessonStatus(courseId, lesson.id);
    setStatus(savedStatus);
  }, [courseId, lesson.id]);

  const handleMarkAsCompleted = () => {
    setIsMarking(true);
    try {
      updateLessonStatus(courseId, lesson.id, "completed");
      setStatus("completed");
      window.dispatchEvent(new Event("progressUpdated"));
    } catch (error) {
      console.error("Error marking lesson as completed:", error);
    } finally {
      setIsMarking(false);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm overflow-x-auto">
            <Link
              href="/courses"
              className="hover:text-blue-500 whitespace-nowrap"
            >
              Khóa Học
            </Link>
            <span>/</span>
            <Link
              href={`/courses/${courseId}`}
              className="hover:text-blue-500 line-clamp-1"
            >
              {course.title}
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium line-clamp-1">
              {lesson.title}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg sm:text-xl flex-shrink-0">
                  {lesson.order}
                </div>
                <div className="min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 break-words">
                    {lesson.title}
                  </h1>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Bài học {lesson.order} của {course.title}
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap flex-shrink-0 ${
                status === "completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {status === "completed" ? "✓ Hoàn thành" : "○ Chưa bắt đầu"}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 py-4 sm:py-6 border-t border-b border-gray-200">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Thời lượng</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">
                {lesson.duration}
              </p>
              <p className="text-gray-600 text-xs">phút</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Khóa học</p>
              <p className="font-semibold text-gray-800 text-xs sm:text-sm">
                {course.kindOfCourse}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Trình độ</p>
              <p className="font-semibold text-gray-800 text-xs sm:text-sm">
                {getLevelLabel(course.level)}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Trạng thái</p>
              <p
                className={`font-semibold text-xs sm:text-sm ${
                  status === "completed" ? "text-green-600" : "text-gray-600"
                }`}
              >
                {status === "completed" ? "Hoàn thành" : "Chưa bắt đầu"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            Mô Tả Bài Học
          </h2>
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
            {lesson.description}
          </p>
        </div>

        {lesson.url && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              Video Bài Học
            </h2>
            <div className="bg-gray-200 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
              <div className="text-center p-4">
                <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">▶️</div>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                  Video bài học
                </p>
                <a
                  href={lesson.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition min-h-[44px] sm:min-h-[48px] flex items-center justify-center"
                >
                  Xem Video
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 mb-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            {status !== "completed" && (
              <button
                onClick={handleMarkAsCompleted}
                disabled={isMarking}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition min-h-[44px] sm:min-h-[48px] flex items-center justify-center gap-2"
              >
                {isMarking ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Đang cập nhật...</span>
                  </>
                ) : (
                  "✓ Đánh Dấu Đã Hoàn Thành"
                )}
              </button>
            )}
            {status === "completed" && (
              <button
                className="w-full bg-gray-400 cursor-not-allowed text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg min-h-[44px] sm:min-h-[48px] flex items-center justify-center"
                disabled
              >
                ✓ Đã Hoàn Thành
              </button>
            )}
            <Link
              href={`/courses/${courseId}`}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition text-center min-h-[44px] sm:min-h-[48px] flex items-center justify-center"
            >
              ← Quay Lại Khóa Học
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
          {lesson.order > 1 && (
            <Link
              href={`/courses/${courseId}/lessons/${
                course.lessons[lesson.order - 2]?.id
              }`}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-lg font-medium transition text-center min-h-[44px] sm:min-h-[48px] flex items-center justify-center"
            >
              ← Bài Trước
            </Link>
          )}
          {lesson.order < course.lessons.length && (
            <Link
              href={`/courses/${courseId}/lessons/${
                course.lessons[lesson.order]?.id
              }`}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition text-center min-h-[44px] sm:min-h-[48px] flex items-center justify-center"
            >
              Bài Tiếp →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonDetailClient;
