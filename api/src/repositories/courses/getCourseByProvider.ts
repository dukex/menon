import { Database } from "../../types";
import { Course } from "../../types";

export async function getCourseByProvider(
  provider: string,
  id: string,
  database: Database
): Promise<Course | null> {
  const stmt = database
    .prepare(
      "SELECT id, provider_id, slug, status FROM courses WHERE provider_id=?1 AND provider_uid=?2"
    )
    .bind(id, provider);

  console.log(await stmt.first());
  return await stmt.first<Course>();
}
