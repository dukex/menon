import { IDatabase } from "../../types";

export async function saveCourse(
  data: {
    id: string;
    provider_uid: string;
    provider_id: string;
    slug: string;
    name: string;
    description: string;
    creator_name: string;
    thumbnail_url: string | null;
    published_at: string;
    source_url: string;
  },
  database: IDatabase
) {
  return database
    .prepare(
      "INSERT INTO courses (id, provider_uid, provider_id, slug, name, description, creator_name, thumbnail_url, published_at, source_url) " +
        " VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)"
    )
    .bind(...Object.values(data))
    .run();
}
