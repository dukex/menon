import { IDatabase } from "../../types";

export async function updateCourse(
  id: string,
  data: Record<string, any>,
  database: IDatabase
) {
  const dataWithUpdatedAt = {
    ...data,
    updated_at: new Date().toISOString(),
  };

  const setStmt = Object.keys(dataWithUpdatedAt)
    .map((name: string, i: number) => `${name}=?${i + 2}`)
    .join(",");

  await database
    .prepare(`UPDATE courses SET ${setStmt} WHERE id=?1`)
    .bind(...[id, ...Object.values(dataWithUpdatedAt)])
    .run();
}
