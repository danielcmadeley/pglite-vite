import { PGlite } from "@electric-sql/pglite";

let db: PGlite | null = null;
let currentUserId: string | null = null;

export function getDatabase(userId?: string): PGlite {
  // If no userId provided, return existing db or create a temporary one
  if (!userId) {
    if (db) return db;
    db = new PGlite("idb://todo-db-temp");
    return db;
  }

  // If we have a different user, close existing connection and create new one
  if (currentUserId !== userId) {
    if (db) {
      // Note: PGlite doesn't have a close method, but we can set it to null
      db = null;
    }

    // Create user-specific database
    db = new PGlite(`idb://todo-db-${userId}`);
    currentUserId = userId;
  }

  return db!;
}

export function clearDatabase() {
  db = null;
  currentUserId = null;
}

export async function initializeTodosTable(userId: string): Promise<void> {
  const database = getDatabase(userId);

  await database.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      task TEXT NOT NULL,
      done BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user_id TEXT NOT NULL DEFAULT '${userId}'
    );

    CREATE INDEX IF NOT EXISTS idx_todos_user_id ON todos(user_id);
  `);
}
