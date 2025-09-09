import { useState, useEffect } from "react";
import { PGliteProvider } from "@electric-sql/pglite-react";
import { getDatabase } from "./database";
import type { PGliteWithLive } from "./types";
import TodoApp from "./TodoApp";
import "./App.css";

function App() {
  const [db, setDb] = useState<PGliteWithLive | null>(null);

  useEffect(() => {
    getDatabase().then(setDb);
  }, []);

  if (!db) {
    return (
      <div className="loading">
        <h2>🚀 Starting PGlite...</h2>
        <p>Loading your offline database</p>
      </div>
    );
  }

  return (
    <PGliteProvider db={db}>
      <TodoApp />
    </PGliteProvider>
  );
}

export default App;
