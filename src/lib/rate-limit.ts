const attempts = new Map<string, { count: number; resetAt: number }>();
let callsSinceCleanup = 0;
const CLEANUP_INTERVAL = 100; // clean up every 100 calls

function cleanup() {
  const now = Date.now();
  for (const [ip, record] of attempts) {
    if (now > record.resetAt) {
      attempts.delete(ip);
    }
  }
}

export function rateLimit(ip: string, limit: number, windowMs: number): boolean {
  callsSinceCleanup++;
  if (callsSinceCleanup >= CLEANUP_INTERVAL) {
    callsSinceCleanup = 0;
    cleanup();
  }

  const now = Date.now();
  const record = attempts.get(ip);
  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + windowMs });
    return true; // allowed
  }
  if (record.count >= limit) {
    return false; // blocked
  }
  record.count++;
  return true; // allowed
}
