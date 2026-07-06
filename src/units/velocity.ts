/**
 * 🚀 Velocity Units
 *
 * Dynamic trait-based types for rates of change (distance/time).
 * Includes a generic Velocity type that computes compound units from component types.
 */

import type { KindOf, UnitOf, WithKind, WithUnit } from '../trait-utils';
import type { Degrees, Radians, Turns } from './angle';
import type { Pixels } from './length';
import type { Milliseconds, Seconds } from './time';

/* ═══════════════════════════════════════════════════════════════
   VELOCITY TYPE SYSTEM
   ═══════════════════════════════════════════════════════════════ */

/**
 * A velocity type that dynamically combines distance and time types.
 * Extracts units from both types and creates a compound unit.
 *
 * The kind is determined by the distance type's kind:
 * - 'angle' kind → 'angular-velocity'
 * - other kinds → 'velocity'
 *
 * @example
 * ```ts
 * type PixelsPerSecond = Velocity<Pixels, Seconds>;
 * // Result: number & WithUnit<'px/s'> & WithKind<'velocity'>
 *
 * type DegreesPerSecond = Velocity<Degrees, Seconds>;
 * // Result: number & WithUnit<'deg/s'> & WithKind<'angular-velocity'>
 * ```
 */
export type Velocity<TDistance, TTime> = number &
  (UnitOf<TDistance> extends never
    ? {}
    : WithUnit<`${UnitOf<TDistance>}/${UnitOf<TTime>}`>) &
  (KindOf<TDistance> extends 'angle'
    ? WithKind<'angular-velocity'>
    : WithKind<'velocity'>);

/* ═══════════════════════════════════════════════════════════════
   COMMON VELOCITY TYPES
   ═══════════════════════════════════════════════════════════════ */

// Linear velocity
export type PixelsPerSecond = Velocity<Pixels, Seconds>;
export type PixelsPerMillisecond = Velocity<Pixels, Milliseconds>;

// Angular velocity
export type DegreesPerSecond = Velocity<Degrees, Seconds>;
export type DegreesPerMillisecond = Velocity<Degrees, Milliseconds>;
export type RadiansPerSecond = Velocity<Radians, Seconds>;
export type RadiansPerMillisecond = Velocity<Radians, Milliseconds>;
export type TurnsPerSecond = Velocity<Turns, Seconds>;
export type TurnsPerMillisecond = Velocity<Turns, Milliseconds>;

// Normalized velocity (for animations/easing)
// Note: Import is lazy to avoid circular dependency
import type { NormalizedProgress, NormalizedTime } from './normalized';

/**
 * Velocity of normalized progress with respect to normalized time.
 * Used for easing function derivatives (dProgress/dTime).
 *
 * @example
 * ```ts
 * const velocity: NormalizedVelocity = 2.5; // Progress changes 2.5 per time unit
 * ```
 */
export type NormalizedVelocity = Velocity<NormalizedProgress, NormalizedTime>;

/* ═══════════════════════════════════════════════════════════════
   VELOCITY OPERATIONS
   ═══════════════════════════════════════════════════════════════ */

/**
 * Calculate velocity from distance and time values.
 *
 * @example
 * ```ts
 * const distance: Pixels = 100;
 * const time: Seconds = 2;
 * const speed = velocityFromValues(distance, time); // 50 px/s
 * ```
 */
export function velocityFromValues<TDistance, TTime>(
  distance: TDistance,
  time: TTime,
): Velocity<TDistance, TTime> {
  return (distance as any) / (time as any);
}

/**
 * Apply velocity over time to get distance.
 *
 * @example
 * ```ts
 * const speed: PixelsPerSecond = 100;
 * const time: Seconds = 2;
 * const distance = applyVelocity(speed, time); // 200 Pixels
 * ```
 */
export function applyVelocity<TDistance, TTime>(
  velocity: Velocity<TDistance, TTime>,
  time: TTime,
): TDistance {
  return ((velocity as any) * (time as any)) as TDistance;
}

/**
 * Convert velocity from per-second to per-millisecond.
 *
 * @example
 * ```ts
 * const pxPerSec: PixelsPerSecond = 1000;
 * const pxPerMs = velocitySecondsToMilliseconds(pxPerSec); // 1 px/ms
 * ```
 */
export function velocitySecondsToMilliseconds<TDistance>(
  velocity: Velocity<TDistance, Seconds>,
): Velocity<TDistance, Milliseconds> {
  return ((velocity as any) / 1000) as Velocity<TDistance, Milliseconds>;
}

/**
 * Convert velocity from per-millisecond to per-second.
 */
export function velocityMillisecondsToSeconds<TDistance>(
  velocity: Velocity<TDistance, Milliseconds>,
): Velocity<TDistance, Seconds> {
  return velocity * 1000;
}
