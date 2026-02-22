import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { challengeBank, Challenge } from '../challenges';
import { minerQueries } from '../db';

const router = Router();

// In-memory active challenges cache (challenge_id -> challenge + expiry)
const activeChallenge = new Map<string, Challenge & { expires_at: string }>();

router.get('/challenge', (req: Request, res: Response): void => {
  try {
    const apiKey = req.headers['x-api-key'] as string;
    const agentId = req.headers['x-agent-id'] as string;

    if (!apiKey || !agentId) {
      res.status(400).json({
        error: 'Missing x-api-key or x-agent-id header'
      });
      return;
    }

    // Update or create miner record
    const now = new Date().toISOString();
    minerQueries.upsert.run(agentId, apiKey, now, now);

    // Select random challenge from bank
    const randomIndex = Math.floor(Math.random() * challengeBank.length);
    const baseChallenge = challengeBank[randomIndex];

    // Create challenge with unique ID and expiry
    const challengeId = uuidv4();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 minutes

    const challenge: Challenge & { expires_at: string } = {
      id: challengeId,
      ...baseChallenge,
      expires_at: expiresAt,
    };

    // Store in cache
    activeChallenge.set(challengeId, challenge);

    // Return challenge (without correct answer)
    res.json({
      challenge_id: challenge.id,
      type: challenge.type,
      prompt: challenge.prompt,
      expected_format: challenge.expected_format,
      difficulty: challenge.difficulty,
      expires_at: challenge.expires_at,
    });
  } catch (error) {
    console.error('Error generating challenge:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as challengeRouter, activeChallenge };
