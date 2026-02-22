import { Router, Request, Response } from 'express';
import { receiptQueries } from '../db';

const router = Router();

interface ReceiptRequest {
  agent_id: string;
  credits_used: number;
  tx_hash: string;
}

router.post('/receipt', (req: Request, res: Response): void => {
  try {
    const { agent_id, credits_used, tx_hash }: ReceiptRequest = req.body;

    if (!agent_id || !credits_used || !tx_hash) {
      res.status(400).json({
        error: 'Missing required fields: agent_id, credits_used, tx_hash'
      });
      return;
    }

    if (credits_used <= 0) {
      res.status(400).json({
        error: 'credits_used must be positive'
      });
      return;
    }

    const recordedAt = new Date().toISOString();

    // Record receipt
    receiptQueries.insert.run(agent_id, credits_used, tx_hash, recordedAt);

    // Update miner's claimed credits
    receiptQueries.updateMinerClaimed.run(credits_used, agent_id);

    res.json({
      success: true,
      agent_id,
      credits_used,
      tx_hash,
      recorded_at: recordedAt,
    });
  } catch (error) {
    console.error('Error recording receipt:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as receiptRouter };
