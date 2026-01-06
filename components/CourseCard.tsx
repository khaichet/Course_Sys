import React from "react";
import Link from "next/link";
import { Course } from "@/lib/types";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
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

  return (
    <Link href={`/courses/${course.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer h-full">
        {/* Thumbnail */}
        <div
          className="relative w-full bg-gray-200"
          style={{ aspectRatio: "16/9" }}
        >
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col h-full">
          {/* Kind & Level */}
          <div className="flex justify-between items-center mb-2 gap-2">
            <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">
              {course.kindOfCourse}
            </span>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded ${getLevelColor(
                course.level
              )}`}
            >
              {getLevelLabel(course.level)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
            {course.title}
          </h3>

          {/* Description (2 lines truncate) */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
            {course.description}
          </p>

          {/* Lessons Count */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <span className="text-sm text-gray-500">
              📚 {course.totalLessons} bài học
            </span>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition">
              Chi tiết
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
