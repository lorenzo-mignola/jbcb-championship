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
  - Full adherence to the **IJF 2025+ Refereeing Rules** supporting **Ippon**, **Waza-ari**, and **Yuko**.
  - Automatic escalation: 2 Waza-ari award _Waza-ari-awasete-ippon_; 3 Shido award _Hansoku-make_.
  - Groundwork immobilization (_Osae-komi_) timer with 2025+ thresholds (5–9s Yuko, 10–19s Waza-ari, 20s Ippon) and **Sonomama** / **Yoshi** support.
  - Immediate Golden Score Osae-komi victory at 5s (_Sore-made!_).
  - Automatic **Golden Score** (sudden death overtime) when regulation expires tied.
  - CH-fr (Swiss-French) keyboard shortcuts for rapid, distraction-free scorekeeping at the table.
- **Standings & Tie-Breaking Engine**:
  - Automated pool standing calculation based on match points, quality evaluation points, head-to-head clash, and cycle-of-beating victory times.
  - Automated aggregate **Club Rankings** tracking medal tallies (Gold, Silver, Bronze) across the tournament.
- **Reporting & Print Suite**:
  - Dedicated print-optimized sheets for category check-in/weigh-in, category brackets, tournament overviews, and podium summaries.

### 🥋 IJF 2025+ Refereeing Rules Compliance

The match engine implements the official **International Judo Federation (IJF) 2025+ Refereeing Rules**:

- **Technical Scores**:
  - **Ippon**: Instant match victory (_Sore-made_). Stops all clocks.
  - **Waza-ari**: Half-point. Two Waza-ari award _Waza-ari-awasete-ippon_ and instant victory.
  - **Yuko**: Minor technical score. Does not accumulate into Waza-ari. Decides match victory if Waza-ari are equal at the end of regulation time.
- **Groundwork Hold (_Osae-komi_)**:
  - `5–9 seconds`: Awards **Yuko**.
  - `10–19 seconds`: Awards **Waza-ari** (or _Ippon_ if the judoka already holds a previous Waza-ari).
  - `20 seconds`: Awards **Ippon** (_Sore-made_).
  - **Golden Score Hold**: During Golden Score, reaching 5 seconds (_Yuko_) immediately ends the contest in victory.
  - **Osae-komi Extra Time**: If regulation time expires (`0:00`) during an active hold, the match continues until _Toketa_ (escape) or _Ippon_.
  - **_Mate_ vs _Sonomama_ / _Yoshi_**: The main Pause button acts as _Mate_ (pausing the match and resetting active groundwork). For _Sonomama_, the dedicated pause button on the hold timer freezes both clocks without losing hold progress; resuming with the main Play button acts as _Yoshi_ restarting both.
- **Penalties (_Shido_)**:
  - 1st & 2nd Shido are recorded as warnings without deciding regulation ties.
  - 3rd Shido triggers immediate disqualification (_Hansoku-make_), awarding Ippon to the opponent.

---

## 🛠️ Technology Stack

- **Framework**: [SvelteKit 3](https://kit.svelte.dev/) with [Svelte 5 Runes](https://svelte.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Skeleton UI v5](https://skeleton.dev/)
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
