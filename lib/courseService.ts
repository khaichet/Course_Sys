import { Course, Lesson } from './types';

const mockLessons: { [key: string]: Lesson[] } = {
  '1': [
    { id: '1-1', courseId: '1', title: 'Introduction to IELTS', duration: 25, url: 'https://www.youtube.com/watch?v=oafyFIOqtsw', description: 'Overview of IELTS exam structure and scoring', status: 'not-started', order: 1 },
    { id: '1-2', courseId: '1', title: 'Listening Module Overview', duration: 30, url: 'https://example.com/video2.mp4', description: 'Tips and tricks for IELTS listening', status: 'not-started', order: 2 },
    { id: '1-3', courseId: '1', title: 'Reading Strategies', duration: 35, url: 'https://example.com/video3.mp4', description: 'Effective reading techniques', status: 'not-started', order: 3 },
    { id: '1-4', courseId: '1', title: 'Writing Task 1', duration: 40, url: 'https://example.com/video4.mp4', description: 'Describing diagrams and graphs', status: 'not-started', order: 4 },
    { id: '1-5', courseId: '1', title: 'Writing Task 2', duration: 45, url: 'https://example.com/video5.mp4', description: 'Essay writing techniques', status: 'not-started', order: 5 },
  ],
  '2': [
    { id: '2-1', courseId: '2', title: 'TOEIC Format', duration: 20, url: 'https://example.com/video6.mp4', description: 'Understanding TOEIC test format', status: 'not-started', order: 1 },
    { id: '2-2', courseId: '2', title: 'Listening Part 1', duration: 25, url: 'https://example.com/video7.mp4', description: 'Photograph description', status: 'not-started', order: 2 },
    { id: '2-3', courseId: '2', title: 'Reading Comprehension', duration: 35, url: 'https://example.com/video8.mp4', description: 'Passage reading strategies', status: 'not-started', order: 3 },
  ],
  '3': [
    { id: '3-1', courseId: '3', title: 'Pronunciation Basics', duration: 30, url: 'https://example.com/video9.mp4', description: 'English pronunciation fundamentals', status: 'not-started', order: 1 },
    { id: '3-2', courseId: '3', title: 'Speaking Skills', duration: 40, url: 'https://example.com/video10.mp4', description: 'Improving fluency and accuracy', status: 'not-started', order: 2 },
  ],
  '4': [
    { id: '4-1', courseId: '4', title: 'VSTEP Level Assessment', duration: 25, url: 'https://example.com/video11.mp4', description: 'Understanding VSTEP levels', status: 'not-started', order: 1 },
  ],
};

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'IELTS Complete Preparation',
    description: 'Comprehensive IELTS preparation course covering all four components: listening, reading, writing, and speaking. This course provides detailed strategies, practice exercises, and sample tests to help you achieve your target score.',
    thumbnail: 'https://images.unsplash.com/photo--14dd9538aa97?w=800&h=450&fit=crop',
    level: 'S',
    kindOfCourse: 'IELTS',
    totalLessons: 5,
    progress: 0,
    status: 'not-started',
    lessons: mockLessons['1'],
  },
  {
    id: '2',
    title: 'TOEIC Business English',
    description: 'Master TOEIC examination with focus on business English. Learn professional vocabulary, understand test formats, and practice with authentic materials.',
    thumbnail: 'https://images.unsplash.com/photo--d307ca884978?w=800&h=450&fit=crop',
    level: 'Pres',
    kindOfCourse: 'TOEIC',
    totalLessons: 3,
    progress: 0,
    status: 'not-started',
    lessons: mockLessons['2'],
  },
  {
    id: '3',
    title: '4 Skills English Development',
    description: 'Develop all four language skills: listening, speaking, reading, and writing. Interactive lessons with real-world scenarios and practical applications.',
    thumbnail: 'https://images.unsplash.com/photo--d307ca884978?w=800&h=450&fit=crop',
    level: 'TC',
    kindOfCourse: '4SKILLS',
    totalLessons: 2,
    progress: 0,
    status: 'not-started',
    lessons: mockLessons['3'],
  },
  {
    id: '4',
    title: 'VSTEP Exam Mastery',
    description: 'VSTEP (Vietnam English Proficiency Test) preparation course. Complete guide to each level and comprehensive practice materials.',
    thumbnail: 'https://images.unsplash.com/photo-1507842072343-583f20270319?w=800&h=450&fit=crop',
    level: 'MTC',
    kindOfCourse: 'VSTEP',
    totalLessons: 1,
    progress: 0,
    status: 'not-started',
    lessons: mockLessons['4'],
  },
  {
    id: '5',
    title: 'IELTS Advanced Writing',
    description: 'Focus on advanced writing techniques for IELTS. Master complex sentence structures, essay organization, and academic vocabulary.',
    thumbnail: 'https://images.unsplash.com/photo--d307ca884978?w=800&h=450&fit=crop',
    level: 'S',
    kindOfCourse: 'IELTS',
    totalLessons: 4,
    progress: 0,
    status: 'not-started',
    lessons: [],
  },
  {
    id: '6',
    title: 'TOEIC Listening Intensive',
    description: 'Intensive listening practice for TOEIC. Includes authentic audio materials, note-taking strategies, and detailed explanations.',
    thumbnail: 'https://images.unsplash.com/photo--14dd9538aa97?w=800&h=450&fit=crop',
    level: 'Pres',
    kindOfCourse: 'TOEIC',
    totalLessons: 6,
    progress: 0,
    status: 'not-started',
    lessons: [],
  },
  {
    id: '7',
    title: '4 Skills Beginner Level',
    description: 'Beginner-friendly English course covering basic communication in all four skills. Perfect for those starting their English journey.',
    thumbnail: 'https://images.unsplash.com/photo-1516534775068-bb57e39c1a41?w=800&h=450&fit=crop',
    level: 'TC',
    kindOfCourse: '4SKILLS',
    totalLessons: 8,
    progress: 0,
    status: 'not-started',
    lessons: [],
  },
  {
    id: '8',
    title: 'VSTEP Speaking Skills',
    description: 'Develop fluent and natural English speaking for VSTEP. Practice speaking tasks with authentic scenarios and instant feedback.',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=450&fit=crop',
    level: 'MTC',
    kindOfCourse: 'VSTEP',
    totalLessons: 5,
    progress: 0,
    status: 'not-started',
    lessons: [],
  },
  {
    id: '9',
    title: 'IELTS Reading Mastery',
    description: 'Master IELTS reading skills with proven strategies. Practice with authentic reading passages and time management techniques.',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=450&fit=crop',
    level: 'S',
    kindOfCourse: 'IELTS',
    totalLessons: 7,
    progress: 0,
    status: 'not-started',
    lessons: [],
  },
  {
    id: '10',
    title: 'TOEIC Complete Package',
    description: 'All-in-one TOEIC preparation including listening, reading, and writing sections. Comprehensive materials for all levels.',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop',
    level: 'Pres',
    kindOfCourse: 'TOEIC',
    totalLessons: 9,
    progress: 0,
    status: 'not-started',
    lessons: [],
  },
];


export const getCourses = async (page: number = 1): Promise<{
  courses: Course[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const pageSize = 9;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const courses = mockCourses.slice(startIndex, endIndex);
  const total = mockCourses.length;
  const totalPages = Math.ceil(total / pageSize);

  return {
    courses,
    total,
    page,
    pageSize,
    totalPages,
  };
};

export const searchAndFilterCourses = async (
  searchQuery: string = '',
  level: string = 'All',
  page: number = 1
): Promise<{
  courses: Course[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  let filteredCourses = mockCourses;

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredCourses = filteredCourses.filter(
      course =>
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.kindOfCourse.toLowerCase().includes(query)
    );
  }

  if (level !== 'All') {
    filteredCourses = filteredCourses.filter(course => course.level === level);
  }

  const pageSize = 9;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const courses = filteredCourses.slice(startIndex, endIndex);
  const total = filteredCourses.length;
  const totalPages = Math.ceil(total / pageSize);

  return {
    courses,
    total,
    page,
    pageSize,
    totalPages,
  };
};

export const getCourseById = async (id: string): Promise<Course | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const course = mockCourses.find(c => c.id === id);
  return course || null;
};

export const getLessonById = async (
  courseId: string,
  lessonId: string
): Promise<Lesson | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));

  const lessons = mockLessons[courseId];
  if (!lessons) return null;

  return lessons.find(l => l.id === lessonId) || null;
};