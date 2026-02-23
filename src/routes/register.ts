import { Router, Request, Response } from 'express';
import { minerQueries } from '../db';
import { randomUUID } from 'crypto';

const router = Router();

interface RegisterRequest {
  agent_id: string;
  name?: string;
}

router.post('/register', (req: Request, res: Response): void => {
  try {
    const { agent_id, name }: RegisterRequest = req.body;

    if (!agent_id) {
      res.status(400).json({
        error: 'Missing required field: agent_id'
      });
      return;
    }

    // Check if agent already exists
    const existing = minerQueries.get.get(agent_id) as any;

    if (existing) {
      res.json({
        agent_id: existing.agent_id,
        api_key: existing.api_key,
        message: 'Agent already registered',
        already_exists: true,
      });
      return;
    }

    // Create new miner
    const api_key = randomUUID();
    const now = new Date().toISOString();

    minerQueries.upsert.run(
      agent_id,
      api_key,
      now,
      now
    );

    res.status(201).json({
      agent_id,
      api_key,
      message: 'Agent registered successfully',
      already_exists: false,
    });
  } catch (error) {
    console.error('Error registering agent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as registerRouter };
