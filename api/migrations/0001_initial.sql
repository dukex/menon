-- Migration number: 0001 	 2024-08-10T23:05:42.514Z

CREATE TABLE IF NOT EXISTS courses (
    "slug" text,
    "provider_uid" text  NOT NULL,
    "provider_id" text  NOT NULL,
    "id" text PRIMARY KEY,
    "name" text   NOT NULL,
    "description" text   NOT NULL,
    "creator_name" text,
    "language" integer,
    "published_at" integer,
    "source_url" text   NOT NULL,
    "thumbnail_url" text,
    "creator_url" text
);

