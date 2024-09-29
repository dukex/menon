import { IDatabase } from "../../../src/types";

export async function updateProgress(
  lessonId: string,
  userId: string,
  progress: number,
  database: IDatabase
) {
  const stmt = database
    .prepare(
      "INSERT INTO lesson_statues (id, lesson_id, user_id, time, finished, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, (SELECT COALESCE(ls.time, 0)/lessons.duration > 0.85 FROM lessons LEFT JOIN lesson_statues ls ON ls.lesson_id = lessons.id AND ls.user_id = ?3 WHERE lessons.id = ?2), ?5, ?6) ON CONFLICT (lesson_id, user_id) DO UPDATE SET time=?4, finished=EXCLUDED.finished, updated_at=?6"
    )
    .bind(
      crypto.randomUUID(),
      lessonId,
      userId,
      progress,
      Date.now(),
      Date.now()
    );

  return stmt.run();
}
