import { RateLimiter } from 'limiter';

// Allow 150 requests per hour (the Twitter search limit). Also understands
// 'second', 'minute', 'day', or a number of milliseconds
export const limiter = new RateLimiter({ tokensPerInterval: 100, interval: 'hour', fireImmediately: true });
