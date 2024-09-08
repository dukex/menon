import { redirect } from "next/navigation";
import { getCourseForMe as _getCourseForMe } from "../../../../api";

export const getLessonIdCourse = async (slug: string, token: string) => {
  const course = await _getCourseForMe(slug, token);

  if (!course) {
    return;
  }

  const lessonId =
    course.lessons.find((l) => l.time > 0)?.id || course.lessons[0].id;

  return lessonId;
};
