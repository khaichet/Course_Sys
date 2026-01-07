"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Course } from "@/lib/types";
import { getCourseProgress } from "@/lib/progressService";
import { motion } from "framer-motion";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const [status, setStatus] = useState<
    "not-started" | "in-progress" | "not-completed" | "completed"
  >("not-started");

  useEffect(() => {
    const courseProgress = getCourseProgress(course.id);
    setStatus(courseProgress?.status || "not-started");

    const handleProgressUpdate = () => {
      const updatedProgress = getCourseProgress(course.id);
      setStatus(updatedProgress?.status || "not-started");
    };

    window.addEventListener("progressUpdated", handleProgressUpdate);
    return () =>
      window.removeEventListener("progressUpdated", handleProgressUpdate);
  }, [course.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "not-completed":
        return "bg-orange-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "✓ Hoàn thành";
      case "not-completed":
        return "◐ Chưa hoàn thành";
      default:
        return "○ Chưa bắt đầu";
    }
  };

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer h-full"
      >
        <div
          className="relative w-full bg-gray-200"
          style={{ aspectRatio: "16/9" }}
        >
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className={`absolute top-2 right-2 px-3 py-1 rounded-full text-white text-xs font-semibold ${getStatusColor(
              status
            )} shadow-md`}
          >
            {getStatusLabel(status)}
          </motion.div>
        </div>

        <div className="p-4 flex flex-col h-full">
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

          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
            {course.title}
          </h3>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
            {course.description}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <span className="text-sm text-gray-500">
              📚 {course.totalLessons} bài học
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition"
            >
              Chi tiết
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CourseCard;
