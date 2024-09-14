import {
  getCourseForMe as _getCourseForMe,
  saveProgress as _saveProgress,
} from "@/api";

export const getCourseForMe = async (slug: string, token: string) => {
  return await _getCourseForMe(slug, token);
};

export const saveProgress = async (
  courseId: string,
  lessonId: string,
  progress: number,
  token: string
) => {
  return await _saveProgress(courseId, lessonId, progress, token);
};
