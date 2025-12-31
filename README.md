# Agentic YouTube Trend Scout

AI-native dashboard that spins up a squad of specialist agents to surface fast-moving YouTube opportunities for your niche.

## Requirements

- Node.js 18.17+
- npm 9+
- (Optional) `YOUTUBE_API_KEY` for live trend data
- (Optional) `OPENAI_API_KEY` for AI-authored insights

## Quick Start

```bash
npm install
npm run dev
```

The app is available at `http://localhost:3000`.

## Environment

Copy `.env.local.example` to `.env.local` and populate:

```ini
YOUTUBE_API_KEY=your-google-api-key
OPENAI_API_KEY=sk-...
```

If keys are missing the UI falls back to staged sample signals and heuristic insights.

## How It Works

1. **Signal gathering** – fetches YouTube Search + Videos API for the keyword, region, and category within the selected lookback window.
2. **Agent fusion** – packages raw metrics and routes them through GPT-4o (when enabled) to write narrative briefings per agent persona.
3. **Action board** – renders the highest-velocity opportunities with suggested next steps for short-, medium-, and monetization-focused formats.

## Scripts

- `npm run dev` – start local development server
- `npm run lint` – run ESLint with Next rules
- `npm run build` – compile the production bundle
- `npm start` – serve the production build

## Deployment

The project is ready for Vercel. Use the provided command:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-0894fa42
```

Set environment variables in Vercel to unlock live data and AI reasoning.

## Folder Structure

```
app/                # Next.js App Router pages & API routes
components/         # UI components and agent controls
lib/                # Data fetching and insight generation helpers
public/             # Static assets (empty by default)
```

## Security Notes

- Keys are read from the environment on the server only; the browser never sees them.
- Requests validate payloads with Zod to guard serverless functions from malformed inputs.

## Roadmap Ideas

- Add historical trending charts per topic
- Expose persona editor for custom agent prompts
- Stream insights in real time as new signals arrive

