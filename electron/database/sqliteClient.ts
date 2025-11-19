// F11: Handles secure connection to SQLite (Data at rest encryption)
import sqlite3 from 'sqlite3';

export class SqliteClient {
  db: sqlite3.Database;
  constructor(dbPath: string) {
    this.db = new sqlite3.Database(dbPath);
  }
  // TODO: add encryption and CRUD methods
}
