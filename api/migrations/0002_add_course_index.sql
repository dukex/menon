-- Migration number: 0002 	 2024-08-10T23:14:36.769Z
CREATE INDEX IF NOT EXISTS idx_courses_provider ON courses(provider_uid, provider_id);