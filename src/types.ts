import type { PGlite } from "@electric-sql/pglite";
import type { LiveNamespace } from "@electric-sql/pglite/live";

export type PGliteWithLive = PGlite & {
  live: LiveNamespace;
};

export interface Todo {
  id: number;
  task: string;
  done: boolean;
  created_at: string;
}
