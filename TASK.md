# Build: Aithereum Coordinator API

## Context
Aithereum ($AITH) is an ERC-20 token on Base where AI agents mine tokens by solving AI challenges (Proof-of-Inference). This is the Coordinator API that manages challenges and credits.

## What to build
Node.js/TypeScript REST API deployed on Railway.

## Tech Stack
- Node.js + TypeScript
- Express.js
- SQLite (better-sqlite3) for persistence
- No ORM needed

## Endpoints

### GET /health
Simple health check. Returns `{ status: "ok", version: "1.0.0" }`

### GET /challenge
Returns a random AI challenge for the miner to solve.

Request headers:
- `x-api-key`: miner's API key (any string, we log it)
- `x-agent-id`: agent identifier

Response:
```json
{
  "challenge_id": "uuid",
  "type": "text_completion" | "classification" | "reasoning",
  "prompt": "Complete this sentence: The capital of France is...",
  "expected_format": "single_word" | "sentence" | "number",
  "difficulty": 1 | 2 | 3,
  "expires_at": "ISO timestamp (5 minutes from now)"
}
```

### POST /submit
Agent submits their answer to a challenge.

Request body:
```json
{
  "challenge_id": "uuid",
  "answer": "Paris",
  "agent_id": "agent-xyz",
  "aith_balance": 50000000
}
```

Response:
```json
{
  "correct": true,
  "credits_earned": 2,
  "reason": "Correct answer. Tier 2 (50M AITH = 2 credits)",
  "total_credits": 47
}
```

Logic:
- Check challenge exists and not expired
- Validate answer (case-insensitive for text, within 10% for numbers)
- Award credits based on AITH balance tier:
  - < 25M AITH → 1 credit
  - 25M-50M AITH → 1 credit  
  - 50M-100M AITH → 2 credits
  - > 100M AITH → 3 credits
- Store result in DB

### GET /stats/:agent_id
Returns mining stats for an agent.

Response:
```json
{
  "agent_id": "agent-xyz",
  "total_challenges": 100,
  "correct": 87,
  "accuracy": 0.87,
  "total_credits": 124,
  "rank": 3,
  "last_seen": "ISO timestamp"
}
```

### GET /leaderboard
Top 10 miners by credits.

### POST /receipt
Record that credits were claimed on-chain (called by smart contract webhook or manually).

Request body:
```json
{
  "agent_id": "agent-xyz",
  "credits_used": 10,
  "tx_hash": "0x..."
}
```

## Challenge Content (hardcode 50+ challenges, mix of types)

Examples:
- "What is 15% of 200?" → "30" (type: number)
- "Translate to French: Hello" → "Bonjour" (type: single_word)
- "What comes next: 2, 4, 8, 16, ___" → "32" (type: number)
- "Capital of Japan?" → "Tokyo" (type: single_word)
- "Opposite of hot?" → "cold" (type: single_word)
- Include 50 total questions across all 3 types
- Mix easy (difficulty 1), medium (2), hard (3)

## Database Schema (SQLite)
```sql
CREATE TABLE miners (
  agent_id TEXT PRIMARY KEY,
  api_key TEXT,
  total_attempts INTEGER DEFAULT 0,
  correct_attempts INTEGER DEFAULT 0,
  total_credits INTEGER DEFAULT 0,
  claimed_credits INTEGER DEFAULT 0,
  created_at TEXT,
  last_seen TEXT
);

CREATE TABLE challenge_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  challenge_id TEXT,
  agent_id TEXT,
  question TEXT,
  correct_answer TEXT,
  submitted_answer TEXT,
  is_correct INTEGER,
  credits_earned INTEGER,
  aith_balance INTEGER,
  attempted_at TEXT
);

CREATE TABLE receipts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id TEXT,
  credits_used INTEGER,
  tx_hash TEXT,
  recorded_at TEXT
);
```

## Files to create
- `package.json` (with scripts: build, start, dev)
- `tsconfig.json`
- `src/index.ts` (Express server, port from process.env.PORT || 3000)
- `src/challenges.ts` (challenge bank, 50+ questions)
- `src/db.ts` (SQLite setup)
- `src/routes/challenge.ts`
- `src/routes/submit.ts`
- `src/routes/stats.ts`
- `src/routes/receipt.ts`
- `railway.json` (for Railway deployment)
- `.env.example`
- `README.md`

## railway.json
```json
{
  "build": { "builder": "NIXPACKS" },
  "deploy": { "startCommand": "npm start", "restartPolicyType": "ON_FAILURE" }
}
```

## Environment Variables
- `PORT` (default 3000)
- `DB_PATH` (default /app/data/coordinator.db — Railway Volume)
- `ADMIN_KEY` (for admin endpoints)

## Important
- TypeScript must compile clean (npx tsc --noEmit passes)
- All routes handle errors gracefully (try/catch, return 500)
- CORS enabled (allow all origins)
- Challenge IDs are UUID v4
- Challenges expire after 5 minutes
- Same challenge can't be reused by same agent within 1 hour

## When done
Push to GitHub, then run:
openclaw system event --text "Done: Aithereum Coordinator API built and pushed to AGIHoldingsArchive/aithereum-coordinator" --mode now
