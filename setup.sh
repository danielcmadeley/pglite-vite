#!/bin/bash

# PGlite Todo App Setup Script
echo "🚀 Setting up PGlite Todo App with Supabase Auth..."

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed. Please install it from https://bun.sh/"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created!"
    echo ""
    echo "🔧 Please edit .env file and add your Supabase credentials:"
    echo "   - VITE_SUPABASE_URL=https://your-project-ref.supabase.co"
    echo "   - VITE_SUPABASE_ANON_KEY=your-anon-key"
    echo ""
    echo "📖 Get these from your Supabase project dashboard:"
    echo "   1. Go to https://supabase.com"
    echo "   2. Create a new project (if you haven't already)"
    echo "   3. Go to Settings → API"
    echo "   4. Copy Project URL and anon/public key"
    echo ""
else
    echo "✅ .env file already exists!"
fi

# Install dependencies
echo "📦 Installing dependencies..."
bun install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Check if environment variables are set
if [ -f .env ]; then
    source .env
    if [ -z "$VITE_SUPABASE_URL" ] || [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
        echo ""
        echo "⚠️  Warning: Supabase environment variables not configured!"
        echo "   Please edit .env file and add your Supabase credentials before starting the app."
        echo ""
    else
        echo "✅ Environment variables configured!"
    fi
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure your Supabase credentials in .env (if not done already)"
echo "2. Run 'bun run dev' to start the development server"
echo "3. Open http://localhost:5173 in your browser"
echo "4. Create an account and start managing your todos!"
echo ""
echo "📚 Need help? Check the README.md file for detailed instructions."
