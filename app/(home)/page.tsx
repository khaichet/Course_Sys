export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Đón chào bạn đến với nền tảng học ngoại ngữ
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Học IELTS, TOEIC, 4 kỹ năng và VSTEP từ những giáo viên giỏi nhất
          </p>
          <a
            href="/courses"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Khám Phá Khóa Học
          </a>
        </div>
      </div>
    </div>
  );
}
