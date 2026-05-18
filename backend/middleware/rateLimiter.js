/**
 * Simple in-memory rate limiter.
 * Returns true if the request should be blocked.
 * 
 * @param {string} ip - Client IP address.
 * @param {Map} attemptsMap - Map storing { count, firstAttempt } per IP.
 * @param {number} limit - Maximum allowed attempts within the timeframe.
 * @param {number} timeframeMs - Time window in milliseconds.
 */
function isRateLimited(ip, attemptsMap, limit = 5, timeframeMs = 15 * 60 * 1000) {
  const now = Date.now();
  const entry = attemptsMap.get(ip) || { count: 0, firstAttempt: now };

  // Reset counter if timeframe has passed
  if (now - entry.firstAttempt > timeframeMs) {
    entry.count = 1;
    entry.firstAttempt = now;
    attemptsMap.set(ip, entry);
    return false;
  }

  entry.count += 1;
  attemptsMap.set(ip, entry);

  return entry.count > limit;
}

module.exports = { isRateLimited };
