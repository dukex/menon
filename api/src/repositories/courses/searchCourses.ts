import { Course, IDatabase } from "../../types";

export async function searchCourses(
  database: IDatabase,
  params: Record<string, string>,
  offset: number = 0,
  limit: number = 150
): Promise<Course[]> {
  const bindings: string[] = [];
  let queries = "WHERE 1=1";

  Object.keys(params).forEach((key) => {
    bindings.push(params[key]);
    queries = queries + ` AND ${key}=?`;
  });

  const stmt = database
    .prepare(
      `SELECT * FROM courses ${queries} ORDER BY published_at DESC LIMIT ${limit} OFFSET ${offset} `
    )
    .bind(...bindings);

  console.log("stmt", stmt);

  return (await stmt.all<Course>()).results;
}
