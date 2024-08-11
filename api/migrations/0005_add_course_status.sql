-- Migration number: 0005 	 2024-08-11T03:38:35.097Z
ALTER TABLE courses ADD COLUMN status TEXT NOT NULL DEFAULT "pending";