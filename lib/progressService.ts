
export interface LessonProgress {
  lessonId: string;
  status: 'not-started' | 'in-progress' | 'completed';
  completedAt?: number;
}

export interface CourseProgress {
  courseId: string;
  lessons: LessonProgress[];
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
}

const STORAGE_KEY = 'courseProgress';


export const getAllProgress = (): Record<string, CourseProgress> => {
  if (typeof window === 'undefined') return {};
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error reading progress from localStorage:', error);
    return {};
  }
};


export const getCourseProgress = (courseId: string): CourseProgress | null => {
  const allProgress = getAllProgress();
  return allProgress[courseId] || null;
};


export const getLessonStatus = (
  courseId: string,
  lessonId: string
): 'not-started' | 'in-progress' | 'completed' => {
  const courseProgress = getCourseProgress(courseId);
  if (!courseProgress) return 'not-started';
  
  const lessonProgress = courseProgress.lessons.find(l => l.lessonId === lessonId);
  return lessonProgress?.status || 'not-started';
};


export const updateLessonStatus = (
  courseId: string,
  lessonId: string,
  status: 'not-started' | 'in-progress' | 'completed'
): void => {
  const allProgress = getAllProgress();
  
  if (!allProgress[courseId]) {
    allProgress[courseId] = {
      courseId,
      lessons: [],
      progress: 0,
      status: 'not-started',
    };
  }
  
  const courseProgress = allProgress[courseId];
  const lessonIndex = courseProgress.lessons.findIndex(l => l.lessonId === lessonId);
  
  if (lessonIndex >= 0) {
    courseProgress.lessons[lessonIndex].status = status;
    if (status === 'completed') {
      courseProgress.lessons[lessonIndex].completedAt = Date.now();
    }
  } else {
    courseProgress.lessons.push({
      lessonId,
      status,
      completedAt: status === 'completed' ? Date.now() : undefined,
    });
  }
  
  const completedCount = courseProgress.lessons.filter(l => l.status === 'completed').length;
  courseProgress.progress = Math.round((completedCount / courseProgress.lessons.length) * 100);
  
  if (courseProgress.progress === 100) {
    courseProgress.status = 'completed';
  } else if (courseProgress.progress > 0) {
    courseProgress.status = 'in-progress';
  } else {
    courseProgress.status = 'not-started';
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    window.dispatchEvent(new Event('progressUpdated'));
  } catch (error) {
    console.error('Error saving progress to localStorage:', error);
  }
};


export const calculateCourseProgress = (
  courseId: string,
  totalLessons: number
): number => {
  const courseProgress = getCourseProgress(courseId);
  if (!courseProgress || courseProgress.lessons.length === 0) return 0;
  
  const completedCount = courseProgress.lessons.filter(l => l.status === 'completed').length;
  return Math.round((completedCount / totalLessons) * 100);
};

export const getCourseLessonStatuses = (
  courseId: string,
  lessonIds: string[]
): Record<string, 'not-started' | 'in-progress' | 'completed'> => {
  const result: Record<string, 'not-started' | 'in-progress' | 'completed'> = {};
  
  lessonIds.forEach(lessonId => {
    result[lessonId] = getLessonStatus(courseId, lessonId);
  });
  
  return result;
};


export const clearCourseProgress = (courseId: string): void => {
  const allProgress = getAllProgress();
  delete allProgress[courseId];
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    window.dispatchEvent(new Event('progressUpdated'));
  } catch (error) {
    console.error('Error clearing progress:', error);
  }
};
