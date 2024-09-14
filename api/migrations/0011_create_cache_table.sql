-- Migration number: 0011 	 2024-09-14T14:30:02.469Z
CREATE TABLE IF NOT EXISTS cache (
  key TEXT PRIMARY KEY,
  namespace TEXT,
  created_at INTEGER,  
  ttl INTEGER,
  value TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS namespace_key_index ON cache (namespace, key);
