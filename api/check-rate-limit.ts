import { VercelRequest, VercelResponse } from '@vercel/node';
import { getRemainingAttempts } from './utils/rateLimit.js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.query;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const remaining = getRemainingAttempts(email);
    return res.status(200).json({ 
      email,
      remaining,
      maxAttempts: 3,
      canSend: remaining > 0
    });
  } catch (error) {
    console.error('Error checking rate limit:', error);
    return res.status(500).json({ error: 'Failed to check rate limit' });
  }
}
