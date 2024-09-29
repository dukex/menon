import { IDatabase } from "../types";
import { getCoursesForUser } from "../repositories/courses/getCoursesForUser";

export default async function _getCoursesForUser(
  id: string,
  database: IDatabase
) {
  const courses = getCoursesForUser(id, database);

  return courses;
}
