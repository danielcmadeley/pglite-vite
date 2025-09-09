# PGlite Todo App

A simple, clean offline todo application built with React and PGlite - a lightweight PostgreSQL database that runs in the browser.

## Features

- ✅ Add, edit, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Offline-first - works without internet connection
- ✅ Data persists in browser's IndexedDB
- ✅ Real-time updates with PGlite live queries
- ✅ Clean, responsive design
- ✅ Minimal dependencies

## Technologies Used

- **React** - UI framework
- **PGlite** - In-browser PostgreSQL database
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Bun** - Package manager and runtime

## Getting Started

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your system.

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   bun install
   ```

### Running the App

Start the development server:

```bash
bun run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

Build the optimized production version:

```bash
bun run build
```

Preview the production build:

```bash
bun run preview
```

## How It Works

This app demonstrates the power of PGlite by:

1. **Database Setup**: Creates an in-browser PostgreSQL database using IndexedDB for persistence
2. **Schema Management**: Automatically creates the todos table on first run
3. **Live Queries**: Uses PGlite's live query feature to automatically update the UI when data changes
4. **Offline Storage**: All data is stored locally in your browser - no server required

### Database Schema

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  task TEXT NOT NULL,
  done BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Project Structure

```
src/
├── App.tsx          # Main app component with PGlite provider
├── TodoApp.tsx      # Todo application logic and UI
├── App.css          # Styles for the todo app
├── index.css        # Global styles
└── main.tsx         # React app entry point
```

## Key Features Explained

### PGlite Integration

- Uses `PGliteProvider` to make the database available throughout the app
- Leverages `useLiveQuery` hook for reactive data fetching
- Stores data in IndexedDB with the `idb://` prefix for persistence

### Live Updates

The app uses PGlite's live query functionality, meaning:
- When you add a todo, the list updates automatically
- When you mark a todo as complete, the stats update instantly
- No manual refresh needed - everything is reactive

### Offline First

- No internet connection required
- All data stored locally in your browser
- Perfect for personal productivity apps

## Customization

You can easily extend this app by:

- Adding due dates to todos
- Implementing categories or tags
- Adding search functionality
- Creating different views (completed, pending, etc.)
- Adding data export/import features

## Learn More

- [PGlite Documentation](https://pglite.dev/docs/)
- [PGlite React Hooks](https://pglite.dev/docs/framework-hooks/react)
- [React Documentation](https://react.dev/)

## License

This project is open source and available under the MIT License.# pglite-vite
