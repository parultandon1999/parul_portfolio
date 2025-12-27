import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { canSendEmail, recordSubmission, getRemainingAttempts } from './api/utils/rateLimit.js';
import { validateEmail } from './api/utils/emailValidator.js';

dotenv.config({ path: '.env.local' });

const app = express();
app.use(express.json());

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.post('/send-message', async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate email format and domain
  const emailValidation = await validateEmail(email);
  if (!emailValidation.valid) {
    return res.status(400).json({ error: emailValidation.reason });
  }

  // Check rate limit
  if (!canSendEmail(email)) {
    const remaining = getRemainingAttempts(email);
    return res.status(429).json({ 
      error: 'Too many requests. You can only send 3 emails in 24 hours. Please try again later.',
      rateLimited: true,
      remaining
    });
  }

  // Check environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || !process.env.EMAIL_RECIPIENT) {
    console.error('Missing environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // Send email to yourself
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT,
      subject: `New Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your message',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>We received your message and will get back to you soon.</p>
        <p>Best regards,<br>Your Portfolio Team</p>
      `,
    });

    // Record this submission
    recordSubmission(email);

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Add endpoint to check rate limit
app.get('/check-rate-limit', (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
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
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
