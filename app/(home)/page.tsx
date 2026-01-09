"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface Instructor {
  id: number;
  name: string;
  specialty: string;
  subjects: string;
  description: string;
  initial: string;
  color: string;
}

const instructors: Instructor[] = [
  {
    id: 1,
    name: "Thầy David Johnson",
    specialty: "Chuyên gia Grammar & Vocabulary",
    subjects: "Ngữ pháp, Từ vựng, IELTS Writing",
    description:
      "Hơn 10 năm kinh nghiệm giảng dạy tiếng Anh, tác giả của nhiều sách IELTS được công bố quốc tế.",
    initial: "D",
    color: "bg-blue-600",
  },
  {
    id: 2,
    name: "Cô Lisa Brown",
    specialty: "Chuyên gia Speaking & Pronunciation",
    subjects: "Phát âm, Giao tiếp, IELTS Speaking",
    description:
      "Native speaker với bằng TEFL, tập trung vào phát triển kỹ năng nói tự nhiên và tự tin.",
    initial: "L",
    color: "bg-pink-600",
  },
  {
    id: 3,
    name: "Thầy Michael Smith",
    specialty: "Chuyên gia Listening & TOEIC",
    subjects: "Nghe hiểu, Chuẩn bị TOEIC, Audio skills",
    description:
      "Chuyên gia TOEIC với 8 năm kinh nghiệm, đã giúp hàng ngàn học viên đạt điểm cao.",
    initial: "M",
    color: "bg-green-600",
  },
  {
    id: 4,
    name: "Cô Emily Chen",
    specialty: "Chuyên gia Writing & Essay",
    subjects: "Viết luận, Academic Writing, Business English",
    description:
      "Giáo viên viết báo chí với kinh nghiệm hướng dẫn học viên viết academic essay chuẩn mực.",
    initial: "E",
    color: "bg-purple-600",
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % instructors.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + instructors.length) % instructors.length
    );
  };

  const getVisibleInstructors = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(instructors[(currentSlide + i) % instructors.length]);
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-teal-600 py-16 px-4 rounded-3xl mx-4 my-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                <span>🎓</span>
                Course App - Nền tảng học tập hiện đại
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Lộ trình rõ ràng, theo sát tiến độ
              </h1>
              <p className="text-lg mb-8 text-teal-50">
                Theo dõi trình độ học, đánh dấu bài đã hoàn thành và tiếp tục
                dùng nội dung được lưu.
              </p>
              <Link
                href="/courses"
                className="inline-block bg-white text-teal-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition flex items-center gap-2"
              >
                <span>🎓</span>
                Tiếp tục khóa học của bạn
                <span>→</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-teal-200 mb-4">
                  Course
                  <br />
                  Learn
                </div>
                <div className="w-32 h-32 bg-teal-500 rounded-full mx-auto mb-6"></div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="w-8 h-8 bg-teal-500 rounded"></div>
                  <div className="w-8 h-8 bg-teal-400 rounded"></div>
                  <div className="w-8 h-8 bg-teal-500 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Giới thiệu về CourseApp
          </h2>

          <div className="space-y-4 text-gray-700 mb-8">
            <p>
              CourseApp là nền tảng học tập trực tuyến được thiết kế cho người
              học hiện đại. Chúng tôi giúp bạn tiếp cận kiến thức một cách hệ
              thống, trực quan và linh hoạt, phù hợp với lịch trình bận rộn.
            </p>
            <p>
              Với hệ thống bài học được xây dựng bởi các chuyên gia, lộ trình rõ
              ràng theo từng mục tiêu, CourseApp đồng hành cùng bạn trên hành
              trình chinh phục các chứng chỉ tiếng Anh và kỹ năng quan trọng.
            </p>
            <p>
              Theo dõi tiến độ, ghi chú bài học, và luyện tập đề dạn mỗi ngày để
              bạn luôn nhìn thấy sự tiến bộ của bản thân.
            </p>
          </div>

          {/* Stats Box */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-semibold text-blue-600 mb-2">
                LỘ TRÌNH CÓ NHÂN
              </p>
              <h3 className="text-4xl font-bold text-gray-900 mb-1">3</h3>
              <p className="text-gray-600 text-sm">
                mục tiêu bạn có thể chọn (IELTS, TOEIC, 4 kỹ năng)
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-600 mb-2">
                BÀI LUYỆN TẬP
              </p>
              <h3 className="text-4xl font-bold text-gray-900 mb-1">180+</h3>
              <p className="text-gray-600 text-sm">
                bài học, quiz và bài tập thực hành
              </p>
            </div>
          </div>

          {/* Why Choose */}
          <div className="mt-8 bg-blue-50 rounded-lg border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              TẠI SAO CHỌN COURSE APP?
            </h3>
            <p className="text-gray-700">
              Giao diện đơn giản, tập trung vào trải nghiệm học tập, kèm các
              công cụ hỗ trợ ghi chú, đánh dấu và xem lại bài đã học.
            </p>
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Đội ngũ giảng viên
            </h2>
            <p className="text-gray-600">
              Học cùng những giảng viên giàu kinh nghiệm, đang làm việc trong
              lĩnh vực.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {getVisibleInstructors().map((instructor) => (
                <div
                  key={instructor.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`w-24 h-24 ${instructor.color} rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4`}
                  >
                    {instructor.initial}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {instructor.name}
                  </h3>
                  <p className="text-blue-600 font-medium text-sm mb-1">
                    {instructor.specialty}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    Chuyên môn: {instructor.subjects}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {instructor.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prevSlide}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Previous"
              >
                <LeftOutlined className="text-xl text-gray-600" />
              </button>

              <div className="flex gap-2">
                {instructors.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? "bg-gray-800" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Next"
              >
                <RightOutlined className="text-xl text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Sẵn sàng bắt đầu hành trình học tập của bạn?
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            Tham gia hàng nghìn học viên đang phát triển kỹ năng tiếng Anh của
            họ
          </p>
          <a
            href="/courses"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
          >
            Khám Phá Các Khóa Học
          </a>
        </div>
      </section>
    </div>
  );
}
