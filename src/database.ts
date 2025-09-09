import { PGlite } from "@electric-sql/pglite";
import { live } from "@electric-sql/pglite/live";
import type { PGliteWithLive } from "./types";

let dbInstance: PGliteWithLive | null = null;

export async function getDatabase(): Promise<PGliteWithLive> {
  if (dbInstance) return dbInstance;

  try {
    dbInstance = new PGlite({
      dataDir: "idb://todo-db",
      extensions: { live },
    }) as PGliteWithLive;
  } catch {
    // Fallback to in-memory if IndexedDB fails
    dbInstance = new PGlite({
      extensions: { live },
    }) as PGliteWithLive;
  }

  return dbInstance;
}
