-- Migration number: 0010 	 2024-09-08T15:01:10.125Z
ALTER TABLE lessons ADD COLUMN metadata TEXT DEFAULT "{}";