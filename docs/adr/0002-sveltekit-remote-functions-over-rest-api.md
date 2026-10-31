# 0002. SvelteKit Remote Functions Over REST API

## Status

Accepted

## Context

The application previously exposed internal REST endpoints (`/api/categories`, `/api/categories/[category_id]`, `/api/categories/[category_id]/match`, `/api/categories/[category_id]/nextMatches`, and `/api/athletes`) and used `ky` on the client to make HTTP calls. This introduced several pain points:

1. **Boilerplate & Double Validation**: Every operation required creating a `+server.ts` route with manual request JSON parsing and separate client-side `ky.post`/`ky.patch` calls.
2. **Contract Desynchronization**: Subtle bugs existed in the REST boundary where client payload shapes did not match server expectations (e.g., passing `{ json: { matchToUpdate } }` when server parsed `MatchSchema` on the root body, or passing `string[]` when server expected `string`).
3. **Domain Vocabulary Misalignment**: The athlete transfer endpoint was named `/api/athletes` with payload `{ athlete }`, conflicting with the canonical domain term **Judoka** defined in [GLOSSARY.md](../../GLOSSARY.md).
4. **Third-Party Dependency**: `ky` added client bundle weight purely to communicate with internal routes.

SvelteKit 2.27+ introduces experimental **Remote Functions** (`query` and `command` imported from `$app/server`), which execute server-side code defined in `.remote.ts` modules directly with end-to-end type safety, automatic serialization via `devalue`, and first-class integration with standard validation schemas (Zod).

## Decision

1. **Adopt SvelteKit Remote Functions**: Enable `experimental: { remoteFunctions: true }` in `vite.config.ts`.
2. **Domain-Aligned Remote Modules**:
   - `src/lib/remote/categories.remote.ts`: Encapsulates `createCategoryCommand`, `editCategoryCommand`, `saveMatchCommand`, and `getNextMatchesQuery`.
   - `src/lib/remote/judoka.remote.ts`: Encapsulates `moveJudokaCommand` adhering to the domain term **Judoka** from [GLOSSARY.md](../../GLOSSARY.md).
3. **Eliminate REST API & `ky`**: Delete `src/routes/api/**` entirely and uninstall `ky`.
4. **Security Enforcement**: Guard `event.isRemoteRequest` in `hooks.server.ts` alongside existing route protections to ensure all remote calls require authenticated, whitelisted sessions.

## Consequences

- **Positive**: Complete end-to-end type safety between client UI components and server-side Firestore operations without REST boilerplate.
- **Positive**: Removal of `ky` from client dependencies, reducing bundle size.
- **Positive**: Fixed contract discrepancies and ensured atomic validation for Judoka transfer between categories.
- **Trade-off**: Relies on experimental SvelteKit remote functions feature flag, which is subject to future API refinement in SvelteKit minor releases.
