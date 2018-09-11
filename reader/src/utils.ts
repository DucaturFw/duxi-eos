export function important<T>(value?: T, message?: string): T {
  if (typeof value === 'undefined') {
    throw new Error(message || 'Important value is undefined');
  }
  return value;
}
