import { getCourseBySlug } from "../repositories/courses/getCourseBySlug";
import { getLessonsForUser } from "../repositories/lessons/getLessonsForUser";
import { IDatabase } from "../types";

export default async function getCourseForUser(
  userId: string,
  courseId: string,
  database: IDatabase
) {
  const course = await getCourseBySlug(courseId, database);

  const lessons = await getLessonsForUser(course!.id, userId, database);

  const progress =
    lessons.filter((lesson) => lesson.finished).length / lessons.length;

  return { ...course, lessons, progress };
}
