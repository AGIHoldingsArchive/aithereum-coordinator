import { Router, Request, Response } from 'express';
import { minerQueries } from '../db';

const router = Router();

router.get('/stats/:agent_id', (req: Request, res: Response): void => {
  try {
    const { agent_id } = req.params;

    if (!agent_id) {
      res.status(400).json({ error: 'Missing agent_id' });
      return;
    }

    const miner = minerQueries.get.get(agent_id) as any;

    if (!miner) {
      res.status(404).json({ error: 'Agent not found' });
      return;
    }

    const rankResult = minerQueries.getRank.get(agent_id) as { rank: number };
    const accuracy = miner.total_attempts > 0
      ? miner.correct_attempts / miner.total_attempts
      : 0;

    res.json({
      agent_id: miner.agent_id,
      total_challenges: miner.total_attempts,
      correct: miner.correct_attempts,
      accuracy: Math.round(accuracy * 100) / 100,
      total_credits: miner.total_credits,
      rank: rankResult.rank,
      last_seen: miner.last_seen,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/leaderboard', (_req: Request, res: Response): void => {
  try {
    const leaders = minerQueries.getLeaderboard.all() as any[];

    const leaderboard = leaders.map((miner, index) => ({
      rank: index + 1,
      agent_id: miner.agent_id,
      total_credits: miner.total_credits,
      total_challenges: miner.total_attempts,
      correct: miner.correct_attempts,
      accuracy: miner.accuracy || 0,
      last_seen: miner.last_seen,
    }));

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as statsRouter };
