-- Migration number: 0008 	 2024-08-17T17:37:46.679Z
CREATE UNIQUE INDEX IF NOT EXISTS courses_lessons_uniq ON courses_lessons(course_id, lesson_id);