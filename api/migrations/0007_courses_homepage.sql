-- Migration number: 0007 	 2024-08-17T16:23:13.000Z

ALTER TABLE courses ADD COLUMN featured BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE courses ADD COLUMN updated_at text;
ALTER TABLE courses ADD COLUMN category text;

CREATE TABLE IF NOT EXISTS courses_lessons (
    "id" text PRIMARY KEY,
    "course_id" text NOT NULL,
    "lesson_id" text NOT NULL,
        FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE,
        FOREIGN KEY(lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);


INSERT INTO courses_lessons(lesson_id, course_id, id)
SELECT id, course_id, (substr(lower(hex(randomblob(16))),1,8)||'-'||substr(lower(hex(randomblob(16))),9,4)||'-4'||substr(lower(hex(randomblob(16))),13,3)||
  '-'||substr('89ab',abs(random()) % 4 + 1, 1))||substr(lower(hex(randomblob(16))),17,3)||'-'||substr(lower(hex(randomblob(16))),21,12)  FROM lessons l ;

DROP INDEX idx_lesson_slug_uniq;
ALTER TABLE lessons DROP COLUMN course_id;
CREATE UNIQUE INDEX IF NOT EXISTS idx_lesson_provider_id_uniq ON lessons(provider_id, provider_uid);