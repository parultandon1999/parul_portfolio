import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

// Basic format validation
export function isValidEmailFormat(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Check if domain has valid MX records (mail servers)
export async function isValidEmailDomain(email) {
  try {
    const domain = email.split('@')[1];
    
    if (!domain) {
      return false;
    }

    // Try to resolve MX records for the domain
    const mxRecords = await resolveMx(domain);
    
    // If MX records exist, domain is valid
    return mxRecords && mxRecords.length > 0;
  } catch (error) {
    console.error(`Error validating domain for ${email}:`, error.message);
    // If we can't check, assume it's invalid to be safe
    return false;
  }
}

// Complete email validation
export async function validateEmail(email) {
  // Step 1: Check format
  if (!isValidEmailFormat(email)) {
    return {
      valid: false,
      reason: 'Invalid email format'
    };
  }

  // Step 2: Check domain has MX records
  const domainValid = await isValidEmailDomain(email);
  if (!domainValid) {
    return {
      valid: false,
      reason: 'Email domain does not exist or has no mail servers'
    };
  }

  return {
    valid: true,
    reason: 'Email is valid'
  };
}
