-- SQL schema definition for local SQLite database
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  name TEXT,
  cognitive_load INTEGER,
  frequency TEXT,
  duration INTEGER,
  load_multiplier REAL
);

CREATE TABLE IF NOT EXISTS tracker (
  task_id TEXT,
  lambda REAL,
  last_completed TEXT,
  PRIMARY KEY (task_id)
);

CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  priority_matrix TEXT
);
