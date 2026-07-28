/**
 * Validate an email address
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate that a string is non-empty after trimming
 */
export function isRequired(value, fieldName = 'This field') {
  if (!value || !value.toString().trim()) {
    return `${fieldName} is required`;
  }
  return null;
}

/**
 * Validate age is a reasonable number
 */
export function isValidAge(age) {
  const num = parseInt(age, 10);
  if (isNaN(num) || num < 2 || num > 25) {
    return 'Age must be between 2 and 25';
  }
  return null;
}

/**
 * Validate fee is a positive number
 */
export function isValidFee(fee) {
  const num = parseFloat(fee);
  if (isNaN(num) || num <= 0) {
    return 'Fee must be a positive number';
  }
  return null;
}

/**
 * Validate capacity is a reasonable number
 */
export function isValidCapacity(capacity) {
  const num = parseInt(capacity, 10);
  if (isNaN(num) || num < 1 || num > 100) {
    return 'Capacity must be between 1 and 100';
  }
  return null;
}

/**
 * Validate a URL
 */
export function isValidUrl(url) {
  try {
    new URL(url);
    return null;
  } catch {
    return 'Please enter a valid URL';
  }
}
