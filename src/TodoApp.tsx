import { useState, useEffect } from "react";
import { usePGlite } from "@electric-sql/pglite-react";
import type { Todo } from "./types";

export default function TodoApp() {
  const db = usePGlite();
  const [newTask, setNewTask] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  // Initialize database schema and live query
  useEffect(() => {
    const initDB = async () => {
      await db.exec(`
        CREATE TABLE IF NOT EXISTS todos (
          id SERIAL PRIMARY KEY,
          task TEXT NOT NULL,
          done BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      const liveQuery = await db.live.query(
        "SELECT * FROM todos ORDER BY created_at DESC",
        [],
        (results) => setTodos(results.rows as Todo[]),
      );

      setTodos(liveQuery.initialResults.rows as Todo[]);
      setIsInitialized(true);

      return () => liveQuery.unsubscribe();
    };

    const cleanup = initDB();
    return () => {
      cleanup.then((cleanupFn) => cleanupFn?.());
    };
  }, [db]);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      await db.query("INSERT INTO todos (task) VALUES ($1)", [newTask.trim()]);
      setNewTask("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const toggleTodo = async (id: number, currentDone: boolean) => {
    try {
      await db.query("UPDATE todos SET done = $1 WHERE id = $2", [
        !currentDone,
        id,
      ]);
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await db.query("DELETE FROM todos WHERE id = $1", [id]);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  if (!isInitialized) {
    return <div className="loading">Initializing database...</div>;
  }

  return (
    <div className="todo-app">
      <header>
        <h1>📝 Todo App</h1>
        <p>Simple offline todo app powered by PGlite</p>
      </header>

      <form onSubmit={addTodo} className="add-todo-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input"
        />
        <button type="submit" className="add-button">
          Add Todo
        </button>
      </form>

      <div className="todos-container">
        {todos.length === 0 ? (
          <div className="empty-state">
            <p>No todos yet. Add one above! 🎯</p>
          </div>
        ) : (
          <ul className="todos-list">
            {todos.map((todo: Todo) => (
              <li
                key={todo.id}
                className={`todo-item ${todo.done ? "completed" : ""}`}
              >
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id, todo.done)}
                    className="todo-checkbox"
                  />
                  <span className="todo-task">{todo.task}</span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                  title="Delete todo"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="todo-footer">
        <div className="stats">
          <span>Total: {todos.length}</span>
          <span>Completed: {todos.filter((t: Todo) => t.done).length}</span>
          <span>Remaining: {todos.filter((t: Todo) => !t.done).length}</span>
        </div>
      </footer>
    </div>
  );
}
