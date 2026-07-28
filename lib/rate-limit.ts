// Best-effort, in-memory fixed-window rate limiter. Counters live per
// server instance and reset on cold start/restart, so this isn't a
// substitute for a shared store (e.g. Redis) under multi-instance
// deployment, but it stops trivial unthrottled brute-forcing.
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) {
    return false;
  }

  bucket.count += 1;
  return true;
}
