-- Migration number: 0004 	 2024-08-11T03:38:29.346Z
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);