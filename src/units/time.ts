/**
 * ⏱️ Time Units
 *
 * Trait-based types for time-based values with type-safe conversions.
 */

import type { WithKind, WithUnit } from '../trait-utils';

/* ═══════════════════════════════════════════════════════════════
   TIME TYPES
   ═══════════════════════════════════════════════════════════════ */

/**
 * Time in seconds.
 * All time types share the 'time' kind.
 */
export type Seconds = WithUnit<'s'> & WithKind<'time'>;

/**
 * Time in milliseconds.
 * All time types share the 'time' kind.
 */
export type Milliseconds = WithUnit<'ms'> & WithKind<'time'>;

/**
 * Time in minutes.
 * All time types share the 'time' kind.
 */
export type Minutes = WithUnit<'min'> & WithKind<'time'>;

/**
 * Time in hours.
 * All time types share the 'time' kind.
 */
export type Hours = WithUnit<'h'> & WithKind<'time'>;

/* ═══════════════════════════════════════════════════════════════
   CONVERTERS
   ═══════════════════════════════════════════════════════════════ */

/** Seconds → Milliseconds (1s = 1000ms) */
export const secondsToMilliseconds = (s: Seconds): Milliseconds =>
  (s * 1000) as Milliseconds;

/** Milliseconds → Seconds */
export const millisecondsToSeconds = (ms: Milliseconds): Seconds =>
  (ms / 1000) as Seconds;

/** Minutes → Seconds (1min = 60s) */
export const minutesToSeconds = (m: Minutes): Seconds => m * 60;

/** Seconds → Minutes */
export const secondsToMinutes = (s: Seconds): Minutes => s / 60;

/** Hours → Minutes (1h = 60min) */
export const hoursToMinutes = (h: Hours): Minutes => h * 60;

/** Minutes → Hours */
export const minutesToHours = (m: Minutes): Hours => m / 60;

/* ═══════════════════════════════════════════════════════════════
   TYPE FAMILIES: Useful unions for function parameters
   ═══════════════════════════════════════════════════════════════ */

/** Any time unit */
export type TimeUnit = Seconds | Milliseconds | Minutes | Hours;

/** Common animation time units (seconds or milliseconds) */
export type AnimationTimeUnit = Seconds | Milliseconds;
