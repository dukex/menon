import { IDatabase } from "../types";
import { searchCourses } from "../repositories/courses/searchCourses";

export default async function searchCourse(
  params: URLSearchParams,
  database: IDatabase
) {
  const offset = parseInt(params.get("offset")) || 0;
  const paramsQuery: Record<string, string> = {};

  params.forEach((value: string, key: string) => {
    if (key !== "offset") {
      paramsQuery[key] = value;
    }
  });

  const results = await searchCourses(database, paramsQuery, offset, 150);

  const meta: Record<string, any> = Array.from(params.entries()).reduce(
    (acc, entry) => {
      acc[entry[0]] = entry[1];
      return acc;
    },
    {}
  );

  return {
    meta,
    results,
  };
}
