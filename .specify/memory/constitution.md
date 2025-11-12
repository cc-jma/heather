<!--
SYNC IMPACT REPORT
==================
Version: 0.0.0 → 1.0.0

Changes:
- Initial constitution creation
- Added 5 core principles: Simplicity First, Code Quality Over Coverage, 80% Solutions, Maintainability-Driven Design, Balanced Testing
- Added Development Standards section
- Added Governance section

Templates Status:
✅ plan-template.md - Constitution Check section aligns with principles
✅ spec-template.md - User story prioritization supports 80% solutions
✅ tasks-template.md - Testing approach aligns with balanced testing principle
✅ checklist-template.md - No conflicts identified
✅ agent-file-template.md - No conflicts identified

Follow-up Actions:
- None

Rationale for MAJOR version (1.0.0):
- First official ratification of project constitution
- Establishes foundational governance framework
-->

# Heather Constitution

## Core Principles

### I. Simplicity First

Code MUST favor clarity over cleverness. Every line of code is a liability that must be maintained, understood, and debugged. Therefore:

- Use the most straightforward solution that solves the problem
- Avoid abstractions until patterns emerge from real usage (minimum 3 instances)
- Delete code aggressively when requirements change
- Reject features that complicate the core mental model
- When choosing between elegant complexity and simple repetition, choose simple repetition

**Rationale**: Simple code is maintainable code. Future developers (including yourself) will thank you for choosing boring, obvious solutions over clever ones.

### II. Code Quality Over Coverage

Quality is measured by reliability and maintainability, not by metrics. Code MUST be:

- **Readable**: Self-documenting through clear naming and structure
- **Consistent**: Follow established patterns within the project (TypeScript import type syntax, OpenAPI generation workflow)
- **Reviewed**: All changes require review before merge
- **Linted**: Automated checks catch common errors (ESLint, Detekt, Prettier)
- **Typed**: Use strong typing where available (TypeScript strict mode, Kotlin type safety)

**Rationale**: High-quality code reduces bugs in production and accelerates development by making the codebase predictable and trustworthy.

### III. 80% Solutions

Perfect is the enemy of shipped. Features MUST target the 80% use case and deliver value quickly:

- Build for the common case first
- Document limitations clearly rather than over-engineering for edge cases
- Ship iteratively and gather feedback before expanding scope
- Reject complexity that serves <20% of users unless absolutely critical
- Prefer configuration over customization for the long tail

**Rationale**: The 20% of edge cases often require 80% of the effort. Serve the majority first, validate the approach, then decide if edge cases warrant investment.

### IV. Maintainability-Driven Design

Every design decision MUST consider the maintenance burden:

- Minimize dependencies (audit and remove unused packages regularly)
- Prefer platform/standard library features over third-party solutions
- Update dependencies strategically, not automatically
- Document architectural decisions and their constraints (ADRs when significant)
- Keep build and deployment processes simple and reproducible

**Rationale**: Code spends 90% of its life being maintained. Optimize for the maintenance phase, not the initial development phase.

### V. Balanced Testing

Testing MUST provide confidence without becoming a maintenance burden:

- **Contract tests**: Required for all public APIs and OpenAPI-defined endpoints
- **Integration tests**: Required for critical user journeys (prioritized user stories from spec)
- **Unit tests**: Optional, use only when logic complexity warrants isolation (e.g., complex business rules, algorithms, state machines)
- **End-to-end tests**: Use sparingly for smoke tests of complete workflows

Tests MUST be:
- Fast enough to run on every commit (<2 minutes for full suite preferred)
- Reliable (no flaky tests tolerated - fix or delete)
- Focused (test behavior, not implementation details)
- Maintained with the same rigor as production code

**Rationale**: Tests that are too extensive become a barrier to change. Tests that are too sparse fail to catch regressions. Balance confidence with velocity.

## Development Standards

### Technology Stack

- **Backend**: Kotlin + Spring Boot, Gradle, Detekt linting
- **Frontend**: TypeScript + React + Vite, ESLint + Prettier, strict type checking
- **API Integration**: OpenAPI specification drives contract (backend exports, frontend consumes)
- **Deployment**: Google Cloud Platform (Cloud Run for backend, Cloud Storage for frontend)

### Configuration Philosophy

When configuring tools (linters, build systems, formatters):
- Specify only non-default options
- Document why defaults were overridden
- Prefer stricter settings over lenient ones

### Code Review Requirements

All pull requests MUST:
- Pass automated linting and type checking
- Pass all existing tests
- Include contract tests for new API endpoints
- Include integration tests for new user journeys (if feature spec requires)
- Have clear, descriptive commit messages
- Reference related issue or feature spec

## Governance

### Amendment Process

1. Propose changes via pull request to `.specify/memory/constitution.md`
2. Document rationale and impact in PR description
3. Update version following semantic versioning:
   - **MAJOR**: Removing/redefining principles or mandatory requirements
   - **MINOR**: Adding new principles or expanding existing guidance
   - **PATCH**: Clarifications, typos, non-semantic refinements
4. Sync dependent templates (plan-template.md, spec-template.md, tasks-template.md)
5. Require approval from at least one maintainer
6. Update `LAST_AMENDED_DATE` to current date

### Compliance

- All planning documents MUST include a Constitution Check section
- Code reviews MUST verify adherence to principles
- Complexity violations MUST be explicitly justified in planning documents
- Constitution supersedes all other development practices

### Enforcement

Constitution violations should be flagged during:
- Specification review (simplicity, scope creep)
- Planning review (complexity, testing strategy)
- Code review (quality, maintainability)
- Retrospectives (process improvements)

**Version**: 1.0.0 | **Ratified**: 2025-11-12 | **Last Amended**: 2025-11-12
