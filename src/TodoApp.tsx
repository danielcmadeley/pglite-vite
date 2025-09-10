import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { useTodos } from "./useTodos";
import type { Todo } from "./types";

export default function TodoApp() {
  const [newTask, setNewTask] = useState("");
  const { user, signOut } = useAuth();
  const { todos, loading, addTodo, toggleTodo, deleteTodo } = useTodos();

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    await addTodo(newTask);
    setNewTask("");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>🚀 Loading your todos...</h2>
        <p>Setting up your personal database</p>
      </div>
    );
  }

  return (
    <div className="todo-app">
      <header>
        <div className="header-content">
          <div>
            <h1>📝 Todo App</h1>
            <p>Your personal offline todo app</p>
          </div>
          <div className="user-info">
            <span className="user-email">{user?.email}</span>
            <button onClick={handleSignOut} className="sign-out-button">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <form onSubmit={handleAddTodo} className="add-todo-form">
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
