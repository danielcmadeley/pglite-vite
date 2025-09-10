import { useState, useEffect } from "react";
import { getDatabase } from "./database";
import type { Todo } from "./types";

export default function TodoApp() {
  const [newTask, setNewTask] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const db = getDatabase();

  const loadTodos = async () => {
    const result = await db.query(
      "SELECT * FROM todos ORDER BY created_at DESC",
    );
    setTodos(result.rows as Todo[]);
  };

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
      await loadTodos();
    };

    initDB();
  }, []);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    await db.query("INSERT INTO todos (task) VALUES ($1)", [newTask.trim()]);
    setNewTask("");
    await loadTodos();
  };

  const toggleTodo = async (id: number, currentDone: boolean) => {
    await db.query("UPDATE todos SET done = $1 WHERE id = $2", [
      !currentDone,
      id,
    ]);
    await loadTodos();
  };

  const deleteTodo = async (id: number) => {
    await db.query("DELETE FROM todos WHERE id = $1", [id]);
    await loadTodos();
  };

  return (
    <div className="todo-app">
      <header>
        <h1>📝 Todo App</h1>
        <p>Simple offline todo app powered by PGLite</p>
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
