# Kaka Store - Local Development Setup

## Overview
Kaka Store is a production-ready online bookstore specializing in competitive exam preparation materials (NEET, JEE, UPSC). Built with React + TypeScript + Tailwind CSS v4 + Vite.

## Prerequisites

Before running the application locally, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** for version control

## Quick Start

### 1. Install Dependencies
```bash
# Using npm (recommended)
npm install

# OR using yarn
yarn install
```

### 2. Environment Setup (Optional)
Create a `.env.local` file in the root directory for backend features:

```bash
# Copy the example file
cp .env.example .env.local
```

Add your Supabase credentials to `.env.local`:
```env
# Supabase Configuration (Optional - app works without this)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Development Configuration
VITE_NODE_ENV=development
VITE_APP_URL=http://localhost:5173
```

### 3. Start Development Server
```bash
# Start the development server
npm run dev

# OR using yarn
yarn dev
```

The application will automatically open at: **http://localhost:5173**

## Project Structure

```
kaka-store/
├── src/                    # Source files (NEW)
│   └── main.tsx           # React entry point (NEW)
├── components/            # Reusable UI components
│   ├── pages/            # Page components
│   ├── auth/             # Authentication components
│   └── ui/               # shadcn/ui components
├── utils/                # Utility functions
├── styles/               # Global CSS and Tailwind config
├── config/               # Configuration files
├── public/               # Static assets
│   ├── manifest.json     # PWA manifest (NEW)
│   └── favicon.svg       # App icon (NEW)
├── supabase/             # Supabase functions and types
├── index.html            # HTML entry point (NEW)
├── App.tsx               # Main application component
└── vite.config.ts        # Vite configuration
```

## Development Scripts

```bash
# Start development server with auto-open browser
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run type-check

# Lint and fix code
npm run lint
npm run lint:fix

# Format code with Prettier
npm run format

# Clean build cache and reinstall
npm run reset

# Analyze bundle size
npm run analyze
```

## Key Features Working Locally

- ✅ **Product Catalog** - 51+ authentic NEET/JEE products with local data
- ✅ **Shopping Cart** - Full cart functionality with local storage
- ✅ **Product Search** - Real-time search through all products
- ✅ **Category Filtering** - Browse by exam type and subject
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **PWA Support** - Installable web app
- ✅ **Wishlist** - Save favorite products locally
- ✅ **Product Reviews** - Mock review system
- ✅ **Fast Performance** - Optimized loading and caching

## Authentication & Backend (Optional)

The app works perfectly **without** any backend setup using:
- Local product data from `/utils/productData.ts`
- Local storage for cart, wishlist, and user preferences
- Mock authentication for demo purposes

### To Enable Full Backend Features:
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Add your credentials to `.env.local`
3. The app will automatically connect to Supabase services

## Environment Detection

The app automatically detects the environment:

```typescript
// Development (local)
- localhost:5173 (Vite dev server)
- 127.0.0.1:5173

// Production
- Your deployed domain
```

## Troubleshooting

### Common Issues & Solutions

1. **"This localhost page can't be found"**
   ```bash
   # Make sure you're in the project directory and run:
   npm install
   npm run dev
   ```

2. **Port already in use**
   ```bash
   # Kill process using port 5173
   sudo lsof -t -i tcp:5173 | xargs kill -9
   # OR change port in vite.config.ts
   ```

3. **Module not found errors**
   ```bash
   # Clear cache and reinstall
   npm run reset
   ```

4. **TypeScript errors**
   ```bash
   # Check types
   npm run type-check
   ```

5. **Styles not loading**
   - Ensure `/styles/globals.css` exists
   - Check for CSS syntax errors in browser console
   - Clear browser cache (Ctrl+Shift+R)

6. **Build fails**
   ```bash
   # Clean and rebuild
   npm run clean
   npm run build
   ```

### Performance Tips

- Use Chrome DevTools to monitor performance
- Images are optimized via ImageKit CDN
- Components are lazy-loaded for better performance
- PWA caching reduces subsequent load times

## Development Environment Setup

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "ms-vscode.vscode-json"
  ]
}
```

### Browser DevTools Setup
1. Install React Developer Tools extension
2. Install Redux DevTools (if using Redux)
3. Enable Performance monitoring in Chrome DevTools

## Production Build

To create a production build:

```bash
npm run build
```

Build output will be in the `dist/` directory.

### Build Analysis
```bash
npm run analyze
```

This will show you bundle sizes and optimization opportunities.

## Deployment

### Recommended Platforms
- **Vercel** (recommended for React apps)
- **Netlify**
- **AWS S3 + CloudFront**
- **Firebase Hosting**

### Environment Variables for Production
```env
VITE_NODE_ENV=production
VITE_APP_URL=https://your-domain.com
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## Development Utilities

In development mode, you have access to environment configuration utilities:

```javascript
// Available in browser console
import { debugInfo } from './utils/environment'
debugInfo() // Shows environment configuration
```

## Performance Monitoring

The app includes built-in performance monitoring:
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)

Check browser console for performance metrics.

## Support & Development

### Getting Help
1. Check browser console for error messages
2. Verify all dependencies are installed: `npm list`
3. Ensure Node.js version is 18+: `node --version`
4. Try clearing cache: `npm run reset`

### Development Best Practices
- Always run `npm run type-check` before committing
- Use `npm run lint:fix` to fix code style issues
- Test on different screen sizes during development
- Monitor performance in Chrome DevTools

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Backend**: Supabase (optional)
- **PWA**: Vite PWA Plugin

## License

Private project - All rights reserved to Kaka Store.

---

**Happy coding! 🚀**

For any issues, check the troubleshooting section above or create an issue in the repository.