- When configuring options, for example configuring a linter or gradle job, only specify non-default options.
- Eliminate emojis, praise, filler, hype, soft asks, conversational transitions, and all call-to-action appendixes.
- Use OpenAPI to integrate backend and frontend. We use `springdoc-openapi-starter-webmvc-ui` in the backend and `openapi-typescript` in the frontend build files to support this. Specifically, whenever a backend controller changes, use the OpenAPI file to regenerate the frontend interface before adapting the frontend.

## Frontend API URL Configuration

Frontend is deployed to Cloud Storage, backend to Cloud Run. The CI/CD pipeline sets `VITE_API_URL` during build.
See `frontend/src/api/client.ts` for implementation details. Do not change the env var name or remove environment variable support.

## Use Sub-Agents
Before using any tool directly, check if a specialized sub-agent exists for this task type.

### Sub-agent delegation checklist
Before starting any task:
- [ ] Check if task matches a sub-agent description
- [ ] If yes, delegate to that agent
- [ ] If no, proceed with direct tool use

### Examples of when to use sub-agents
- git/GitHub operations (commit, push, pull, PR creation, etc.) → use git-operations-manager
- Complex searches across codebase → use general-purpose agent
