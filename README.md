# React + TypeScript + Vite + TailwindCSS + SCSS

Modern, production-ready React starter with latest tools and zero-config setup.

## Features

-   **React 19** - Latest stable with improved performance
-   **TypeScript 5** - Full type safety and modern syntax
-   **Vite 6** - HMR and optimized builds
-   **Tailwind CSS 3** - Utility-first styling
-   **SCSS** - Enhanced CSS with nesting and variables
-   **React Router 7** - Modern routing with error boundaries
-   **ESLint 9** - Latest flat config with TypeScript support
-   **Prettier** - Consistent code formatting
-   **Path Aliases** - Clean imports with `@/` prefix

## Quick Start

```bash
npx @nehemiahdias/create-reactts-vite-tailwind my-app
cd my-app
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

| Command                | Description                               |
| ---------------------- | ----------------------------------------- |
| npm run dev            | Start development server with --host flag |
| npm run build          | Type-check and build for production       |
| npm run preview        | Preview production build locally          |
| npm run lint           | Check code with ESLint                    |
| npm run lint:fix       | Auto-fix linting issues                   |
| npm run type-check     | Validate TypeScript without building      |
| npm run prettier       | Format all files                          |
| npm run prettier-check | Check if files are formatted              |

## Path Aliases

Clean imports without relative path hell:

```typescript
// Use
import { Button } from '@components/Button';
```

## Available aliases:

-   @/ - src/
-   @components/ - src/components/
-   @hooks/ - src/hooks/
-   @utils/ - src/utils/
-   @types/ - src/types/

## Requirements

Node.js >= 18.0.0

npm >= 9.0.0

## What's Included

-   TypeScript strict mode
-   ESLint with React 19 rules
-   Prettier pre-configured
-   Path aliases pre-configured
-   Modern CSS reset
-   Router with error boundary
-   Optimized production builds
-   Build chunking for better caching

#

License
MIT © Nitro

Need help? [Open an issue](https://github.com/NehemiahDias/reactts-vite-tailwind/issues)
