import { getCourseBySlug } from "../repositories/courses/getCourseBySlug";
import { getLessonsByCourseId } from "../repositories/lessons";

import { NotFoundError, IDatabase } from "../types";

export default async function getCourseWithLessons(
  slug: string,
  database: IDatabase
) {
  const course = await getCourseBySlug(slug, database);

  if (!course) {
    throw new NotFoundError("Not found course");
  }

  const lessons = await getLessonsByCourseId(course.id, database);

  return {
    ...course,
    lessons,
  };
}
