import { Router, Request, Response } from 'express';
import { activeChallenge } from './challenge';
import { minerQueries, attemptQueries } from '../db';

const router = Router();

interface SubmitRequest {
  challenge_id: string;
  answer: string;
  agent_id: string;
  aith_balance: number;
}

function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase();
}

function validateAnswer(submitted: string, correct: string, expectedFormat: string): boolean {
  const submittedNorm = normalizeAnswer(submitted);
  const correctNorm = normalizeAnswer(correct);

  if (expectedFormat === 'number') {
    const submittedNum = parseFloat(submitted);
    const correctNum = parseFloat(correct);

    if (isNaN(submittedNum) || isNaN(correctNum)) {
      return submittedNorm === correctNorm;
    }

    // Within 10% tolerance
    const tolerance = Math.abs(correctNum * 0.1);
    return Math.abs(submittedNum - correctNum) <= tolerance;
  }

  // For text answers, exact match (case-insensitive)
  return submittedNorm === correctNorm;
}

function getCreditsForBalance(aithBalance: number): number {
  if (aithBalance >= 100_000_000) {
    return 3;
  } else if (aithBalance >= 50_000_000) {
    return 2;
  } else {
    return 1;
  }
}

function getTierDescription(aithBalance: number): string {
  if (aithBalance >= 100_000_000) {
    return 'Tier 3 (>100M AITH = 3 credits)';
  } else if (aithBalance >= 50_000_000) {
    return 'Tier 2 (50M-100M AITH = 2 credits)';
  } else if (aithBalance >= 25_000_000) {
    return 'Tier 1 (25M-50M AITH = 1 credit)';
  } else {
    return 'Tier 0 (<25M AITH = 1 credit)';
  }
}

function getNextMilestone(currentCredits: number): string {
  const milestones = [
    { threshold: 10, tier: 'Bronze' },
    { threshold: 50, tier: 'Silver' },
    { threshold: 100, tier: 'Gold' },
    { threshold: 250, tier: 'Platinum' },
    { threshold: 500, tier: 'Diamond' },
    { threshold: 1000, tier: 'Master' },
  ];

  for (const milestone of milestones) {
    if (currentCredits < milestone.threshold) {
      const remaining = milestone.threshold - currentCredits;
      return `${remaining} credits until ${milestone.tier}`;
    }
  }

  return 'Legendary status achieved!';
}

router.post('/submit', (req: Request, res: Response): void => {
  try {
    const { challenge_id, answer, agent_id, aith_balance }: SubmitRequest = req.body;

    if (!challenge_id || !answer || !agent_id || aith_balance === undefined) {
      res.status(400).json({
        error: 'Missing required fields: challenge_id, answer, agent_id, aith_balance'
      });
      return;
    }

    // Check if challenge exists
    const challenge = activeChallenge.get(challenge_id);
    if (!challenge) {
      res.status(404).json({
        error: 'Challenge not found or already used'
      });
      return;
    }

    // Check if expired
    const now = new Date();
    const expiresAt = new Date(challenge.expires_at);
    if (now > expiresAt) {
      activeChallenge.delete(challenge_id);
      res.status(400).json({
        error: 'Challenge has expired'
      });
      return;
    }

    // Check if agent already attempted this challenge recently (within 1 hour)
    const recentAttempt = attemptQueries.hasRecentAttempt.get(agent_id, challenge_id) as { count: number };
    if (recentAttempt.count > 0) {
      res.status(400).json({
        error: 'You have already attempted this challenge recently. Please wait 1 hour.'
      });
      return;
    }

    // Validate answer
    const isCorrect = validateAnswer(answer, challenge.correct_answer, challenge.expected_format);
    const creditsEarned = isCorrect ? getCreditsForBalance(aith_balance) : 0;

    // Record attempt
    const attemptedAt = new Date().toISOString();
    attemptQueries.insert.run(
      challenge_id,
      agent_id,
      challenge.prompt,
      challenge.correct_answer,
      answer,
      isCorrect ? 1 : 0,
      creditsEarned,
      aith_balance,
      attemptedAt
    );

    // Update miner stats
    minerQueries.updateStats.run(
      isCorrect ? 1 : 0,
      creditsEarned,
      attemptedAt,
      agent_id
    );

    // Update streak
    minerQueries.updateStreak.run(
      isCorrect ? 1 : 0,
      agent_id
    );

    // Remove challenge from active pool
    activeChallenge.delete(challenge_id);

    // Get updated stats
    const miner = minerQueries.get.get(agent_id) as any;
    const totalCredits = miner?.total_credits || 0;
    const totalAttempts = miner?.total_attempts || 1;
    const correctAttempts = miner?.correct_attempts || 0;
    const streak = miner?.streak || 0;
    const accuracy = totalAttempts > 0 ? correctAttempts / totalAttempts : 0;

    // Get rank
    const rankResult = minerQueries.getRank.get(agent_id) as any;
    const rank = rankResult?.rank || 0;

    if (isCorrect) {
      res.json({
        correct: true,
        credits_earned: creditsEarned,
        reason: `Correct answer. ${getTierDescription(aith_balance)}`,
        total_credits: totalCredits,
        rank,
        accuracy: Math.round(accuracy * 100) / 100,
        streak,
        next_milestone: getNextMilestone(totalCredits),
      });
    } else {
      res.json({
        correct: false,
        credits_earned: 0,
        reason: `Incorrect answer. Expected: ${challenge.correct_answer}`,
        total_credits: totalCredits,
        rank,
        accuracy: Math.round(accuracy * 100) / 100,
        streak,
        next_milestone: getNextMilestone(totalCredits),
      });
    }
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as submitRouter };
