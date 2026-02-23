import { Router, Request, Response, NextFunction } from 'express';
import { db, minerQueries } from '../db';

const router = Router();

// Admin authentication middleware
function requireAdminKey(req: Request, res: Response, next: NextFunction): void {
  const adminKey = req.headers['x-admin-key'] as string;
  const expectedKey = process.env.ADMIN_KEY;

  if (!expectedKey) {
    res.status(503).json({
      error: 'Admin functionality not configured'
    });
    return;
  }

  if (adminKey !== expectedKey) {
    res.status(403).json({
      error: 'Invalid admin key'
    });
    return;
  }

  next();
}

// Apply admin key requirement to all admin routes
router.use(requireAdminKey);

// GET /admin/miners - Paginated list of all miners
router.get('/admin/miners', (req: Request, res: Response): void => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    const miners = db.prepare(`
      SELECT agent_id, total_attempts, correct_attempts, total_credits,
             claimed_credits, streak,
             ROUND(CAST(correct_attempts AS REAL) / NULLIF(total_attempts, 0), 2) as accuracy,
             created_at, last_seen
      FROM miners
      ORDER BY total_credits DESC
      LIMIT ? OFFSET ?
    `).all(limit, offset);

    const totalCount = db.prepare('SELECT COUNT(*) as count FROM miners').get() as { count: number };

    res.json({
      miners,
      pagination: {
        page,
        limit,
        total: totalCount.count,
        total_pages: Math.ceil(totalCount.count / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching miners:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /admin/stats - Overall system statistics
router.get('/admin/stats', (req: Request, res: Response): void => {
  try {
    const totalMiners = db.prepare('SELECT COUNT(*) as count FROM miners').get() as { count: number };

    const totalAttempts = db.prepare('SELECT COUNT(*) as count FROM challenge_attempts').get() as { count: number };

    const totalCreditsIssued = db.prepare('SELECT SUM(total_credits) as sum FROM miners').get() as { sum: number };

    const topMiner = db.prepare(`
      SELECT agent_id, total_credits, correct_attempts, total_attempts
      FROM miners
      ORDER BY total_credits DESC
      LIMIT 1
    `).get();

    res.json({
      total_miners: totalMiners.count,
      total_attempts: totalAttempts.count,
      total_credits_issued: totalCreditsIssued.sum || 0,
      top_miner: topMiner,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /admin/reset/:agent_id - Reset a miner to zero (for testing)
router.post('/admin/reset/:agent_id', (req: Request, res: Response): void => {
  try {
    const { agent_id } = req.params;

    const miner = minerQueries.get.get(agent_id);
    if (!miner) {
      res.status(404).json({
        error: 'Miner not found'
      });
      return;
    }

    db.prepare(`
      UPDATE miners
      SET total_attempts = 0,
          correct_attempts = 0,
          total_credits = 0,
          claimed_credits = 0,
          streak = 0
      WHERE agent_id = ?
    `).run(agent_id);

    db.prepare('DELETE FROM challenge_attempts WHERE agent_id = ?').run(agent_id);
    db.prepare('DELETE FROM receipts WHERE agent_id = ?').run(agent_id);

    res.json({
      success: true,
      message: `Miner ${agent_id} has been reset to zero`,
    });
  } catch (error) {
    console.error('Error resetting miner:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as adminRouter };
