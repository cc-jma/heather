### Import Syntax Requirements

- **Always use type-only imports for types**: When importing TypeScript types, interfaces, or type aliases, use `import type { TypeName } from './module'`
- **Separate runtime and type imports**: Keep runtime values and types in separate import statements
- **Check TypeScript configuration**: If encountering import errors mentioning 'verbatimModuleSyntax', verify that imports follow the type-only pattern

### API Code Generation

- **NEVER manually edit** `src/api/generated/*` files - they are auto-generated from OpenAPI
- **ALWAYS use** `npm run generate-api` to regenerate types after backend API changes
- **Start backend first** with `cd backend && ./gradlew bootRun` before running generate-api

### Workflow Integration

- After generating API types from OpenAPI specs, immediately verify that all consuming components use proper `import type` syntax
- When updating existing components to use generated types, convert existing type imports to `import type`

### Example Patterns

```
  // ✅ Correct - separate runtime and type imports
  import { apiClient } from './api';
  import type { User, ApiResponse } from './api';

  // ❌ Incorrect - mixing runtime and types
  import { apiClient, User, ApiResponse } from './api';
```
