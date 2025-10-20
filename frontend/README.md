# Heather Frontend

React TypeScript application template.

## Technology Stack

- **Framework**: React
- **Language**: TypeScript
- **Build Tool**: Vite
- **Testing**: Vitest
- **Linting**: ESLint + Prettier

## Project Structure

```
src/
├── App.tsx              # Main application component
├── App.css              # Application styles
├── main.tsx            # Application entry point
├── api/                # API integration
├── assets/             # Static assets
└── test/               # Test configuration
```

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
npm run format       # Format with Prettier
npm run validate     # Run all checks
npm run generate-api # Generate TypeScript types from OpenAPI
```

## Environment Variables

Local development works without configuration - Vite proxies `/api` requests to `http://localhost:8080`.

To use a different backend URL, create `.env`:

```
VITE_API_BASE_URL=http://localhost:3000
```

Production values are set automatically by CI/CD.

## Development Guidelines

### Code Style

- Functional components with hooks
- TypeScript for type safety
- Prettier formatting on pre-commit

### Testing

- Unit tests with Vitest
- React Testing Library for components
- Playwright for E2E tests

### Pre-commit Hooks

Automatically runs:

1. ESLint with auto-fix
2. Prettier formatting

## Building for Production

```bash
npm run build
```

Creates optimized build in `dist/` with:

- Minified bundles
- Tree-shaking
- Cache-optimized filenames

## Deployment

Deployed to Google Cloud Storage via GitLab CI/CD:

1. Builds with Vite
2. Uploads to Cloud Storage bucket
3. Sets cache headers for assets

## API Integration

- **Local**: Proxied through Vite dev server
- **Production**: Uses `VITE_API_BASE_URL` environment variable

## Dependencies

### Core

- React & React DOM
- TypeScript
- Vite

### Utilities (included for future use)

- React Router
- React Query
- React Hook Form
- Axios
- Zustand
- Zod

## Troubleshooting

- **API connection issues**: Ensure backend is running on port 8080
- **Build failures**: Clear node_modules and reinstall
- **Type errors**: Run `npm run typecheck`
- **Linting issues**: Run `npm run format` to auto-fix
