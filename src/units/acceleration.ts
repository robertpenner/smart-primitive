/**
 * 🏎️ Acceleration Units
 *
 * Dynamic trait-based types for rates of change of velocity (distance/time²).
 * Includes a generic Acceleration type that computes compound units from component types.
 */

import type { KindOf, UnitOf, WithKind, WithUnit } from '../trait-utils';
import type { Degrees, Radians, Turns } from './angle';
import type { Pixels } from './length';
import type { Milliseconds, Seconds } from './time';

/* ═══════════════════════════════════════════════════════════════
   ACCELERATION TYPE SYSTEM
   ═══════════════════════════════════════════════════════════════ */

/**
 * An acceleration type that dynamically combines distance and time types.
 * Extracts units from both types and creates a compound unit (distance/time²).
 *
 * The kind is determined by the distance type's kind:
 * - 'angle' kind → 'angular-acceleration'
 * - other kinds → 'acceleration'
 *
 * @example
 * ```ts
 * type PixelsPerSecondSquared = Acceleration<Pixels, Seconds>;
 * // Result: number & WithUnit<'px/s²'> & WithKind<'acceleration'>
 *
 * type DegreesPerSecondSquared = Acceleration<Degrees, Seconds>;
 * // Result: number & WithUnit<'deg/s²'> & WithKind<'angular-acceleration'>
 * ```
 */
export type Acceleration<TDistance, TTime> =
  WithUnit<`${UnitOf<TDistance>}/${UnitOf<TTime>}²`> &
    (KindOf<TDistance> extends 'angle'
      ? WithKind<'angular-acceleration'>
      : WithKind<'acceleration'>);

/* ═══════════════════════════════════════════════════════════════
   COMMON ACCELERATION TYPES
   ═══════════════════════════════════════════════════════════════ */

// Linear acceleration
export type PixelsPerSecondSquared = Acceleration<Pixels, Seconds>;
export type PixelsPerMillisecondSquared = Acceleration<Pixels, Milliseconds>;

// Angular acceleration
export type DegreesPerSecondSquared = Acceleration<Degrees, Seconds>;
export type DegreesPerMillisecondSquared = Acceleration<Degrees, Milliseconds>;
export type RadiansPerSecondSquared = Acceleration<Radians, Seconds>;
export type RadiansPerMillisecondSquared = Acceleration<Radians, Milliseconds>;
export type TurnsPerSecondSquared = Acceleration<Turns, Seconds>;
export type TurnsPerMillisecondSquared = Acceleration<Turns, Milliseconds>;

// Normalized acceleration (for animations/easing)
// Note: Import is lazy to avoid circular dependency
import type { NormalizedProgress, NormalizedTime } from './normalized';

/**
 * Acceleration of normalized progress with respect to normalized time.
 * Used for easing function second derivatives (d²Progress/dTime²).
 *
 * @example
 * ```ts
 * const accel: NormalizedAcceleration = 6; // Progress accelerates at 6 per time unit²
 * ```
 */
export type NormalizedAcceleration = Acceleration<
  NormalizedProgress,
  NormalizedTime
>;
