# PGlite Todo App with Supabase Authentication

A clean, offline-first todo application built with React, PGlite, and Supabase Auth. Each user gets their own personal todo lists that sync across devices while maintaining offline functionality.

## Features

- 🔐 **User Authentication** - Secure signup/login with Supabase Auth
- 👤 **Personal Todo Lists** - Each user has their own isolated todos
- ✅ **Full CRUD Operations** - Add, edit, delete, and toggle todos
- 📱 **Offline-First** - Works without internet, syncs when online
- 💾 **Local Storage** - Data persists in browser's IndexedDB per user
- 🎨 **Clean Design** - Responsive, modern interface
- ⚡ **Fast Performance** - Minimal dependencies, optimized builds

## Technologies Used

- **React** + **TypeScript** - UI framework with type safety
- **PGlite** - In-browser PostgreSQL database
- **Supabase** - Authentication and user management
- **Vite** - Lightning-fast build tool
- **Bun** - Package manager and runtime

## Getting Started

### Prerequisites

1. [Bun](https://bun.sh/) installed on your system
2. A Supabase project (free at [supabase.com](https://supabase.com))

### Supabase Setup

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com) and sign up
   - Create a new project
   - Wait for setup to complete

2. **Get Your Project Credentials**:
   - Go to Settings → API
   - Copy your `Project URL`
   - Copy your `anon/public` API key

3. **Configure Environment Variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Installation

1. Install dependencies:
   ```bash
   bun install
   ```

2. Start the development server:
   ```bash
   bun run dev
   ```

3. Open `http://localhost:5173` and create an account!

### Building for Production

```bash
bun run build
```

Preview the production build:
```bash
bun run preview
```

## How Authentication Works

### User-Specific Databases
- Each authenticated user gets their own PGlite database
- Database naming: `idb://todo-db-{userId}`
- Complete data isolation between users
- Automatic cleanup when users sign out

### Authentication Flow
1. **Unauthenticated**: Shows login/signup form
2. **Sign Up**: Creates account, sends email verification
3. **Sign In**: Authenticates existing users
4. **Authenticated**: Loads user-specific todos
5. **Sign Out**: Clears local data and returns to auth

### Database Schema (Per User)

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  task TEXT NOT NULL,
  done BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id TEXT NOT NULL
);

CREATE INDEX idx_todos_user_id ON todos(user_id);
```

## Project Structure

```
src/
├── App.tsx          # Main app with auth provider
├── AuthContext.tsx  # Authentication state management
├── Auth.tsx         # Login/signup UI components
├── TodoApp.tsx      # Todo application logic
├── supabase.ts      # Supabase client configuration
├── database.ts      # PGlite database management
├── types.ts         # TypeScript type definitions
├── Auth.css         # Authentication component styles
└── App.css          # Main application styles
```

## Key Features Explained

### Offline-First Architecture
- **Local Storage**: All todos stored in user-specific PGlite databases
- **No Server Dependency**: App works completely offline after auth
- **Fast Performance**: Instant CRUD operations with local database

### Multi-User Support
- **Isolated Data**: Each user's todos are completely separate
- **Secure Authentication**: Powered by Supabase Auth
- **Email Verification**: Optional email confirmation for new users

### Clean Code Design
- **React Hooks**: Modern functional components throughout
- **TypeScript**: Full type safety and IntelliSense
- **Error Boundaries**: Graceful error handling
- **Responsive Design**: Works on desktop and mobile

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key | ✅ |

## Security Notes

- **Environment Variables**: Never commit `.env` to version control
- **Anon Key**: Safe to expose in client-side code (it's designed for this)
- **Row Level Security**: Consider enabling RLS in Supabase for extra security
- **Local Data**: User data stays in their browser unless you add sync features

## Customization Ideas

### Easy Extensions
- **Categories/Tags**: Add todo categorization
- **Due Dates**: Implement deadline functionality  
- **Priority Levels**: Add importance indicators
- **Search/Filter**: Find todos quickly
- **Dark Mode**: Toggle UI themes

### Advanced Features
- **Sync to Supabase**: Store todos in cloud database too
- **Team Collaboration**: Share todo lists between users
- **Mobile App**: Convert to React Native
- **PWA Features**: Add offline notifications

## Troubleshooting

### Common Issues

**"Missing Supabase environment variables"**
- Ensure `.env` file exists and has correct variable names
- Check that variables start with `VITE_` prefix
- Restart dev server after adding environment variables

**Authentication not working**
- Verify Supabase project URL and API key are correct
- Check Supabase dashboard for project status
- Ensure email confirmation is handled (check spam folder)

**Todos not loading**
- Check browser console for errors
- Verify user is authenticated before accessing todos
- Clear browser storage and try again

## Learn More

- [PGlite Documentation](https://pglite.dev/)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)

## License

MIT License - feel free to use this project as a starting point for your own applications!