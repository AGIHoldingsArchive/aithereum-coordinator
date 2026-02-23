import { Request, Response, NextFunction } from 'express';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

function createRateLimiter(maxRequests: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const agentId = req.headers['x-agent-id'] as string || req.body?.agent_id;

    if (!agentId) {
      res.status(401).json({
        error: 'Missing agent_id in headers or body'
      });
      return;
    }

    const key = `${agentId}:${req.path}`;
    const now = Date.now();
    const entry = rateLimitStore.get(key);

    if (!entry || now > entry.resetAt) {
      // Create new entry
      rateLimitStore.set(key, {
        count: 1,
        resetAt: now + windowMs,
      });
      next();
      return;
    }

    if (entry.count >= maxRequests) {
      const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
      res.status(429).json({
        error: 'Rate limit exceeded',
        retry_after_seconds: retryAfterSeconds,
      });
      return;
    }

    // Increment count
    entry.count++;
    next();
  };
}

// 10 requests per minute for /challenge
export const rateLimitChallenge = createRateLimiter(10, 60 * 1000);

// 20 requests per minute for /submit
export const rateLimitSubmit = createRateLimiter(20, 60 * 1000);
