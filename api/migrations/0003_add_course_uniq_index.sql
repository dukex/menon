-- Migration number: 0003 	 2024-08-10T23:23:07.189Z
CREATE UNIQUE INDEX IF NOT EXISTS idx_courses_provider_uniq ON courses(provider_uid, provider_id, source_url);