import React from "react";
import { getCourseById } from "@/lib/courseService";
import { notFound } from "next/navigation";
import CourseDetailClient from "@/components/CourseDetailClient";

interface CourseDetailPageProps {
  params: Promise<{ id: string }>;
}

const CourseDetailPage = async ({ params }: CourseDetailPageProps) => {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  return <CourseDetailClient course={course} />;
};

export default CourseDetailPage;
