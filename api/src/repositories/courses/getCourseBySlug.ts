import { Database } from "../../types";
import { Course } from "../../types";

export async function getCourseBySlug(
  slug: string,
  database: Database
): Promise<Course | null> {
  const stmt = database
    .prepare("SELECT * FROM courses WHERE (slug=? OR id=?) LIMIT 1")
    .bind(slug, slug);

  return await stmt.first<Course>();
}
