import { useState, useEffect } from "react";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "./hooks/useAuth";
import { getDatabase, clearDatabase } from "./database";
import TodoApp from "./TodoApp";
import Auth from "./Auth";
import "./App.css";

function AppContent() {
  const [isReady, setIsReady] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Initialize database connection for authenticated user
        getDatabase(user.id);
      } else {
        // Clear any existing database connection when user signs out
        clearDatabase();
      }
      setIsReady(true);
    }
  }, [user, loading]);

  if (loading || !isReady) {
    return (
      <div className="loading">
        <h2>🚀 Starting PGlite...</h2>
        <p>Loading your offline database</p>
      </div>
    );
  }

  // Show auth screen if not authenticated
  if (!user) {
    return <Auth />;
  }

  // Show todo app if authenticated
  return <TodoApp />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
