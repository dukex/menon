-- Migration number: 0006 	 2024-08-11T05:33:28.943Z
CREATE TABLE IF NOT EXISTS lessons (
    "slug" text,
    "name" text   NOT NULL,
    "duration" integer,
    "position" integer,
    "provider_uid" text  NOT NULL,
    "provider_id" text  NOT NULL,
    "thumbnail_url" text,
    "description" te    xt   NOT NULL,
    "course_id" text   NOT NULL,
    "id" text PRIMARY KEY,
    "creator_name" text,
    "published_at" text NOT NULL,
    "source_url" text   NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_lesson_slug_uniq ON lessons(course_id, slug);