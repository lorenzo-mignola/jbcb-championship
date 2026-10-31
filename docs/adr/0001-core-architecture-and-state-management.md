# 0001. Core Architecture and State Management

## Status

Accepted

## Context

Tournament judo software requires millisecond-level responsiveness for table judges, resilience against accidental browser refreshes, reliable multi-mat concurrent operations, and strict administrative access controls. Additionally, judo match scoring involves complex reactive transitions (countdown timers, hold-down clocks, automatic technical score escalations, Golden Score transitions, and immediate victory halts) alongside tournament progression algorithms across round-robin pools and double-elimination brackets.

## Decision

We adopted a reactive full-stack architecture pairing **SvelteKit 2 + Svelte 5 runes** on the frontend with **Firebase Firestore** on the backend:

1. **Framework & Hosting**: Deployed on Vercel via `@sveltejs/adapter-vercel`, utilizing SvelteKit 2 and Svelte 5 runes (`$state`, `$derived`, `$effect`) for fine-grained client reactivity without heavy external state libraries.
2. **Client-Side Match Engine & Persistence**: Match scoring (`MatchState`, `TimerState`, `OsaekomiState`) executes entirely on the client as a reactive state machine. State mutations are modeled using `Immer` drafts to guarantee immutability, while current match state and active timers are mirrored to browser `localStorage` for instant session recovery in case of connection drop or page refresh.
3. **Database & Authorization**: Tournament categories, athletes, and completed match records are stored in Firebase Firestore (`categories` collection) using the Firebase Admin SDK. Authentication uses `Better-Auth` with a Firestore adapter and Google Social OAuth, backed by a strict server-side hook whitelist (`allowed_accounts` collection) that protects all administrative, scoring, and editing routes.
4. **Tournament Grid Generation**: Pure deterministic models generate competition grids (`singlePool` using Berger round-robin rotation, `doublePool` with crossover semifinals, and `brackets` with full repechage paths), dynamically recalculating standings upon match completion.

## Consequences

- **Positive**: Zero latency during live match scoring; table judges never experience network lag when triggering points or stopping timers.
- **Positive**: Matches withstand network loss or browser reloads seamlessly because live state lives in memory and `localStorage` until finalized.
- **Positive**: Clean separation between pure domain tournament calculation models and UI presentation layers.
- **Trade-off**: Results are persisted to Firestore only when the judge explicitly finalizes the match, requiring judges not to close tabs mid-match without finishing or relying on local state.
- **Trade-off**: Firestore Admin credentials and Google OAuth client secrets are strictly required in the runtime environment for administrative access.
