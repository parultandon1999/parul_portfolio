import fs from 'fs';
import path from 'path';

const SUBMISSIONS_FILE = path.join(process.cwd(), 'data', 'submissions.json');
const MAX_EMAILS_PER_24H = 3;
const HOURS_24 = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface SubmissionRecord {
  timestamps: number[];
}

interface SubmissionsData {
  [email: string]: SubmissionRecord;
}

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read submissions data
function readSubmissions(): SubmissionsData {
  ensureDataDir();
  try {
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading submissions file:', error);
  }
  return {};
}

// Write submissions data
function writeSubmissions(data: SubmissionsData) {
  ensureDataDir();
  try {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing submissions file:', error);
  }
}

// Get remaining attempts for an email
export function getRemainingAttempts(email: string): number {
  const submissions = readSubmissions();
  const now = Date.now();

  if (!submissions[email]) {
    return MAX_EMAILS_PER_24H;
  }

  // Filter timestamps within last 24 hours
  const recentSubmissions = submissions[email].timestamps.filter(
    (timestamp) => now - timestamp < HOURS_24
  );

  // Update the record with only recent submissions
  submissions[email].timestamps = recentSubmissions;
  writeSubmissions(submissions);

  return Math.max(0, MAX_EMAILS_PER_24H - recentSubmissions.length);
}

// Check if email can send (returns true if allowed, false if blocked)
export function canSendEmail(email: string): boolean {
  return getRemainingAttempts(email) > 0;
}

// Record a new submission
export function recordSubmission(email: string) {
  const submissions = readSubmissions();
  const now = Date.now();

  if (!submissions[email]) {
    submissions[email] = { timestamps: [] };
  }

  // Filter old timestamps (older than 24 hours)
  submissions[email].timestamps = submissions[email].timestamps.filter(
    (timestamp) => now - timestamp < HOURS_24
  );

  // Add new timestamp
  submissions[email].timestamps.push(now);

  writeSubmissions(submissions);
}
