import { redirect } from "next/navigation";
import { getCourse as _getCourse } from "../../../../api";

export const getLessonIdCourse = async (slug: string) => {
  const course = await _getCourse(slug);

  if (!course) {
    return;
  }

  // TODO: get user last lesson
  const lessonId = course.lessons![0].id;

  return lessonId;
};
