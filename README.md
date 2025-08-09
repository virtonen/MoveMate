# MoveMate — Your Personalized Relocation Assistant

MoveMate helps you find the perfect place to live by creating personalized recommendations based on your interests, budget, and lifestyle preferences. Get neighborhood insights, housing listings, and local events tailored just for you.

## Features

- **Personalized Recommendations**: Smart matching based on your interests, budget, and lifestyle
- **Multi-City Support**: Currently supports San Francisco, New York, and Boston
- **Interactive Form**: Easy-to-use form with validation and localStorage persistence
- **Dynamic Dashboard**: View your top listings and upcoming local events
- **Responsive Design**: Works seamlessly on desktop and mobile

## Prerequisites

- **Node.js 18+** or **Bun 1.1+**
- **Git** (for cloning)

## Quick Start

### Option 1: Using Bun (Recommended)

```bash
# Install Bun if you don't have it
curl -fsSL https://bun.sh/install | bash
# or: brew install oven-sh/bun/bun

# Clone and setup
git clone <repository-url>
cd MoveMate

# Install dependencies
bun install

# Start development server
bun dev
```

### Option 2: Using npm

```bash
# Install Node.js if you don't have it
# Download from: https://nodejs.org/

# Clone and setup
git clone <repository-url>
cd MoveMate

# Install dependencies
npm install

# Start development server
npm run dev
```

## Accessing the App

Open [http://localhost:3000](http://localhost:3000) in your browser to see MoveMate.

- **Network access**: The dev server binds to `0.0.0.0`, so you can also access it from other devices on your network at `http://YOUR_IP:3000`
- **Port conflict**: If port 3000 is busy, use `bun dev -p 3001` or `npm run dev -- -p 3001`

## How to Use

1. **Fill out the form**: Select your interests, location, budget, and other preferences
2. **Submit**: Click "Help Me Move" to generate your personalized dashboard
3. **View recommendations**: See your top listings and local events
4. **Edit selections**: Use the "Edit selections" button to modify your preferences

## Project Structure

```
MoveMate/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx        # Main form page
│   │   ├── dashboard/      # Dashboard page
│   │   └── api/            # API routes
│   ├── lib/
│   │   ├── db.ts           # Database utilities
│   │   ├── recommend.ts    # Recommendation engine
│   │   └── utils.ts        # Utility functions
│   └── data/
│       └── db.json         # Local JSON database
├── public/
│   └── uploads/            # Static assets (logo)
└── package.json
```

## Development Commands

```bash
# Development server
bun dev              # Start with hot reload

# Production build
bun run build        # Build for production
bun start            # Run production server

# Code quality
bun run lint         # Run ESLint and TypeScript checks
bun run format       # Format code with Biome
```

## Data Management

- **Database**: Uses a local JSON file (`src/data/db.json`) that auto-expands with demo data
- **Persistence**: Form selections are saved in localStorage for easy editing
- **Reset data**: Delete `src/data/db.json` and restart to reset all data

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: SWR
- **Runtime**: Bun or Node.js
- **Development**: Turbopack for fast builds

## Troubleshooting

### Common Issues

1. **"Command not found: npm"**
   - Install Node.js from [nodejs.org](https://nodejs.org/)
   - Or use Bun instead: `brew install oven-sh/bun/bun`

2. **Port 3000 already in use**
   - Use a different port: `bun dev -p 3001`

3. **Hydration errors**
   - Hard refresh the page (Cmd+Shift+R)
   - Try in incognito mode if browser extensions cause issues

4. **Logo not showing**
   - Ensure your logo is at `public/uploads/MoveMate.jpg`
   - Check browser console for 404 errors

### Reset Everything

```bash
# Stop the server (Ctrl+C)
rm src/data/db.json
bun dev  # Restart - will regenerate demo data
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `bun dev`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).