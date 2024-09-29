import { Course, IDatabase } from "../../types";

export async function getCoursesForUser(userId: string, database: IDatabase) {
  const stmt = database
    .prepare(
      "SELECT ROUND(SUM(ls.finished + 0.0)/COUNT(cl.id), 2) as progress, c.* " +
        "FROM courses c " +
        "LEFT JOIN courses_lessons cl ON cl.course_id = c.id " +
        "LEFT JOIN lesson_statues ls ON ls.lesson_id = cl.lesson_id AND ls.user_id = ?1 " +
        "WHERE c.id IN ( " +
        "    SELECT DISTINCT cl.course_id " +
        "    FROM lesson_statues ls " +
        "    JOIN courses_lessons cl ON cl.lesson_id = ls.lesson_id " +
        "    WHERE ls.user_id = ?1 " +
        ") " +
        "GROUP BY c.id"
    )
    .bind(userId);

  console.log(stmt);

  return (await stmt.all<Course>()).results;
}
