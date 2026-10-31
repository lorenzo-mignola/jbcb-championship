# JBCB Championship

<p align="center">
  <img src="static/android-chrome-192x192.png" alt="JBCB Championship Logo" width="128" height="128" />
</p>

<p align="center">
  <strong>Comprehensive digital tournament management and live scoreboard system for judo championships.</strong>
</p>

<p align="center">
  <a href="https://jbcb-championship.vercel.app/">Live Web Application</a>
</p>

---

## 📖 Documentation Quick Links

- 🇮🇹 **[Manuale Utente (Italiano)](./docs/manuale-utente.md)**: Guida operativa completa per ufficiali di gara e giudici di tavolo (configurazione torneo, conduzione incontri, cronometri, immobilizzazioni, scorciatoie da tastiera e report di stampa).
- 🥋 **[Domain Glossary](./GLOSSARY.md)**: Canonical terminology and domain concepts for tournaments, judoka, scoring, and bracket models.
- 🏛️ **[System Architecture](./docs/architecture.md)**: Detailed technical specifications, Firestore schemas, Svelte 5 reactive state engine, and tournament tie-breaking mathematics.
- 📋 **[Architecture Decision Records (ADRs)](./docs/adr/0001-core-architecture-and-state-management.md)**: Consolidated architectural design decisions and trade-offs.

---

## ✨ Features

- **Tournament & Category Formats**:
  - **Single Pool**: Round-robin format implementing the Berger rotation algorithm.
  - **Double Pool**: Two independent pools with crossover semifinals and final medal matches.
  - **Double Elimination (2KO)**: Championship bracket with a full repechage tree and two bronze medal finals.
- **Digital Match Scoreboard**:
  - Zero-latency client-side scoring engine with `localStorage` state protection.
  - Full adherence to the **IJF 2026 Rules** supporting **Ippon**, **Waza-ari**, and **Yuko**.
  - Automatic escalation: 2 Waza-ari award _Waza-ari-awasete-ippon_; 3 Shido award _Hansoku-make_.
  - Groundwork immobilization (_Osae-komi_) timer: automatic score progression (5s Yuko, 10s Waza-ari, 20s Ippon) with **Sonomama** / **Yoshi** support.
  - Automatic **Golden Score** (sudden death overtime) when regulation expires tied.
  - CH-fr (Swiss-French) keyboard shortcuts for rapid, distraction-free scorekeeping at the table.
- **Standings & Tie-Breaking Engine**:
  - Automated pool standing calculation based on match points, quality evaluation points, head-to-head clash, and cycle-of-beating victory times.
  - Automated aggregate **Club Rankings** tracking medal tallies (Gold, Silver, Bronze) across the tournament.
- **Reporting & Print Suite**:
  - Dedicated print-optimized sheets for category check-in/weigh-in, category brackets, tournament overviews, and podium summaries.

---

## 🛠️ Technology Stack

- **Framework**: [SvelteKit 2](https://kit.svelte.dev/) with [Svelte 5 Runes](https://svelte.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Skeleton UI v4](https://skeleton.dev/)
- **Database**: [Google Cloud Firestore](https://firebase.google.com/docs/firestore) via [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- **Authentication**: [Better-Auth](https://www.better-auth.com/) with Google OAuth and Firestore email whitelist
- **State & Immutability**: [Immer](https://immerjs.github.io/immer/) and [Ramda](https://ramdajs.com/)
- **Validation**: [Zod](https://zod.dev/)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v26.x` (configured in `.nvmrc` / `package.json`)
- **Package Manager**: `pnpm` `v12.x`

### Installation

```bash
# Clone the repository
git clone https://github.com/lorenzo-mignola/jbcb-championship.git
cd jbcb-championship

# Install dependencies
pnpm install
```

### Environment Configuration

Copy the example environment configuration file:

```bash
cp .env.example .env.local
```

Fill in your credentials:

- `FIREBASE_SERVICE_ACCOUNT`: Stringified JSON of your Google Cloud Service Account with Firestore Admin permissions.
- `BETTER_AUTH_SECRET`: Random 32+ character secret for session signing.
- `BETTER_AUTH_URL`: Local URL (e.g. `http://localhost:5173`) or production deployment URL.
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: OAuth credentials from the Google Cloud Console.

### Development Commands

```bash
# Start local development server with HMR
pnpm dev

# Type check across Svelte and TypeScript files
pnpm check

# Run ESLint validation
pnpm lint

# Execute Vitest test suite
pnpm test

# Run tests once without watch mode
pnpm vitest run

# Build production bundle
pnpm build

# Preview production build locally
pnpm preview
```

---

## 🔒 Security & Admin Access

Administrative features (creating categories, scoring matches, and editing entries) require an authenticated Google account whose email exists in the `allowed_accounts` Firestore collection. Unlisted accounts are automatically redirected to an access denied screen via `hooks.server.ts`.
