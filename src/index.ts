import express, { Request, Response } from 'express';
import cors from 'cors';
import { initializeDatabase } from './db';
import { challengeRouter } from './routes/challenge';
import { submitRouter } from './routes/submit';
import { statsRouter } from './routes/stats';
import { receiptRouter } from './routes/receipt';
import { registerRouter } from './routes/register';
import { adminRouter } from './routes/admin';
import { rateLimitChallenge, rateLimitSubmit } from './middleware/rateLimit';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req: Request, _res: Response, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Initialize database
initializeDatabase();

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
  });
});

// Routes
app.use('/', registerRouter);
app.use('/', statsRouter);
app.use('/', receiptRouter);
app.use('/', adminRouter);

// Rate-limited routes
app.use('/', rateLimitChallenge, challengeRouter);
app.use('/', rateLimitSubmit, submitRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: any) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Aithereum Coordinator API running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});
