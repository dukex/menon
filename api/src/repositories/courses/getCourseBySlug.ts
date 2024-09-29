import { IDatabase } from "../../types";
import { Course } from "../../types";

export async function getCourseBySlug(
  slug: string,
  database: IDatabase
): Promise<Course | null> {
  const stmt = database
    .prepare("SELECT * FROM courses WHERE (slug=? OR id=?) LIMIT 1")
    .bind(slug, slug);

  return stmt.first<Course>();
}
