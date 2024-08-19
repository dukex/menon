-- Migration number: 0009 	 2024-08-18T20:58:47.113Z

CREATE TABLE IF NOT EXISTS lesson_statues (
    "time" text,
    "finished" boolean  NOT NULL,
    "lesson_id" text  NOT NULL,
    "id" text PRIMARY KEY,
    "user_id" text   NOT NULL,
    "created_at" text   NOT NULL,
    "updated_at" text   NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_lesson_statues_uniq ON lesson_statues(lesson_id, user_id);