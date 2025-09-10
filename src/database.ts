import { PGlite } from "@electric-sql/pglite";

let db: PGlite | null = null;

export function getDatabase(): PGlite {
  if (db) return db;

  db = new PGlite("idb://todo-db");
  return db;
}
