import React from "react";
import { getCourseById } from "@/lib/courseService";
import { getLessonById } from "@/lib/courseService";
import { notFound } from "next/navigation";
import LessonDetailClient from "@/components/LessonDetailClient";

interface LessonDetailPageProps {
  params: Promise<{ id: string; lessonId: string }>;
}

const LessonDetailPage = async ({ params }: LessonDetailPageProps) => {
  const { id: courseId, lessonId } = await params;

  const course = await getCourseById(courseId);
  if (!course) {
    notFound();
  }

  const lesson = await getLessonById(courseId, lessonId);
  if (!lesson) {
    notFound();
  }

  return (
    <LessonDetailClient course={course} lesson={lesson} courseId={courseId} />
  );
};

export default LessonDetailPage;
