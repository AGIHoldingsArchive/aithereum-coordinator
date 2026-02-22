import Database, { Database as DatabaseType, Statement } from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'coordinator.db');

// Ensure directory exists
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const db: DatabaseType = new Database(DB_PATH);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// Initialize schema
export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS miners (
      agent_id TEXT PRIMARY KEY,
      api_key TEXT,
      total_attempts INTEGER DEFAULT 0,
      correct_attempts INTEGER DEFAULT 0,
      total_credits INTEGER DEFAULT 0,
      claimed_credits INTEGER DEFAULT 0,
      created_at TEXT,
      last_seen TEXT
    );

    CREATE TABLE IF NOT EXISTS challenge_attempts (
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

    CREATE TABLE IF NOT EXISTS receipts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agent_id TEXT,
      credits_used INTEGER,
      tx_hash TEXT,
      recorded_at TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_attempts_agent ON challenge_attempts(agent_id);
    CREATE INDEX IF NOT EXISTS idx_attempts_challenge ON challenge_attempts(challenge_id);
    CREATE INDEX IF NOT EXISTS idx_receipts_agent ON receipts(agent_id);
  `);

  console.log('Database initialized at:', DB_PATH);
}

// Miner operations
export const minerQueries: {
  upsert: Statement;
  get: Statement;
  updateStats: Statement;
  getLeaderboard: Statement;
  getRank: Statement;
} = {
  upsert: db.prepare(`
    INSERT INTO miners (agent_id, api_key, total_attempts, correct_attempts, total_credits, created_at, last_seen)
    VALUES (?, ?, 0, 0, 0, ?, ?)
    ON CONFLICT(agent_id) DO UPDATE SET
      api_key = excluded.api_key,
      last_seen = excluded.last_seen
  `),

  get: db.prepare('SELECT * FROM miners WHERE agent_id = ?'),

  updateStats: db.prepare(`
    UPDATE miners
    SET total_attempts = total_attempts + 1,
        correct_attempts = correct_attempts + ?,
        total_credits = total_credits + ?,
        last_seen = ?
    WHERE agent_id = ?
  `),

  getLeaderboard: db.prepare(`
    SELECT agent_id, total_credits, total_attempts, correct_attempts,
           ROUND(CAST(correct_attempts AS REAL) / NULLIF(total_attempts, 0), 2) as accuracy,
           last_seen
    FROM miners
    WHERE total_attempts > 0
    ORDER BY total_credits DESC
    LIMIT 10
  `),

  getRank: db.prepare(`
    SELECT COUNT(*) + 1 as rank
    FROM miners
    WHERE total_credits > (SELECT total_credits FROM miners WHERE agent_id = ?)
  `),
};

// Challenge attempt operations
export const attemptQueries: {
  insert: Statement;
  getRecentAttempt: Statement;
  hasRecentAttempt: Statement;
} = {
  insert: db.prepare(`
    INSERT INTO challenge_attempts (
      challenge_id, agent_id, question, correct_answer,
      submitted_answer, is_correct, credits_earned, aith_balance, attempted_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `),

  getRecentAttempt: db.prepare(`
    SELECT * FROM challenge_attempts
    WHERE agent_id = ? AND challenge_id = ?
    ORDER BY attempted_at DESC
    LIMIT 1
  `),

  hasRecentAttempt: db.prepare(`
    SELECT COUNT(*) as count
    FROM challenge_attempts
    WHERE agent_id = ? AND challenge_id = ?
      AND datetime(attempted_at) > datetime('now', '-1 hour')
  `),
};

// Receipt operations
export const receiptQueries: {
  insert: Statement;
  updateMinerClaimed: Statement;
} = {
  insert: db.prepare(`
    INSERT INTO receipts (agent_id, credits_used, tx_hash, recorded_at)
    VALUES (?, ?, ?, ?)
  `),

  updateMinerClaimed: db.prepare(`
    UPDATE miners
    SET claimed_credits = claimed_credits + ?
    WHERE agent_id = ?
  `),
};
