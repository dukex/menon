import { updateProgress } from "../repositories/lessons/updateProgress";
import { IDatabase } from "../types";

export default async function updateLessonProgress(
  userId: string,
  id: string,
  progress: number,
  database: IDatabase
) {
  await updateProgress(id, userId, progress, database);
}
