import { useState, useEffect } from "react";
import { getDatabase } from "./database";
import TodoApp from "./TodoApp";
import "./App.css";

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize database connection
    getDatabase();
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <div className="loading">
        <h2>🚀 Starting PGlite...</h2>
        <p>Loading your offline database</p>
      </div>
    );
  }

  return <TodoApp />;
}

export default App;
