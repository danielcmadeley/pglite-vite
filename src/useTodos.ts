import { useState, useEffect, useCallback } from "react";
import { getDatabase, initializeTodosTable } from "./database";
import { useAuth } from "./hooks/useAuth";
import type { Todo } from "./types";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const db = getDatabase(user?.id);

  const loadTodos = useCallback(async () => {
    if (!user?.id) return;

    try {
      const result = await db.query(
        "SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC",
        [user.id],
      );
      setTodos(result.rows as Todo[]);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  }, [user?.id, db]);

  useEffect(() => {
    const initDB = async () => {
      if (!user?.id) return;

      try {
        await initializeTodosTable(user.id);
        await loadTodos();
      } catch (error) {
        console.error("Error initializing database:", error);
      } finally {
        setLoading(false);
      }
    };

    initDB();
  }, [user?.id, loadTodos]);

  const addTodo = useCallback(
    async (task: string) => {
      if (!task.trim() || !user?.id) return;

      try {
        await db.query("INSERT INTO todos (task, user_id) VALUES ($1, $2)", [
          task.trim(),
          user.id,
        ]);
        await loadTodos();
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    },
    [user?.id, db, loadTodos],
  );

  const toggleTodo = useCallback(
    async (id: number, currentDone: boolean) => {
      if (!user?.id) return;

      try {
        await db.query(
          "UPDATE todos SET done = $1 WHERE id = $2 AND user_id = $3",
          [!currentDone, id, user.id],
        );
        await loadTodos();
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    },
    [user?.id, db, loadTodos],
  );

  const deleteTodo = useCallback(
    async (id: number) => {
      if (!user?.id) return;

      try {
        await db.query("DELETE FROM todos WHERE id = $1 AND user_id = $2", [
          id,
          user.id,
        ]);
        await loadTodos();
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    },
    [user?.id, db, loadTodos],
  );

  return {
    todos,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
