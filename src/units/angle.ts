/**
 * 📐 Angle Units
 *
 * Trait-based types for angular measurements with type-safe conversions.
 */

import type {
  WithKind,
  WithPeriodic,
  WithRange,
  WithUnit,
} from '../trait-utils';

/* ═══════════════════════════════════════════════════════════════
   ANGLE TYPES
   ═══════════════════════════════════════════════════════════════ */

/**
 * Angle in degrees [0, 360), periodic.
 * All angle types share the 'angle' kind.
 */
export type Degrees = WithUnit<'deg'> &
  WithRange<0, 360> &
  WithPeriodic &
  WithKind<'angle'>;

/**
 * Angle in radians [0, 2π), periodic.
 * All angle types share the 'angle' kind.
 */
export type Radians = WithUnit<'rad'> &
  WithRange<0, 6.283185307179586> &
  WithPeriodic &
  WithKind<'angle'>;

/**
 * Angle in turns/rotations [0, 1), periodic.
 * All angle types share the 'angle' kind.
 */
export type Turns = WithUnit<'turn'> &
  WithRange<0, 1> &
  WithPeriodic &
  WithKind<'angle'>;

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════ */

/** Degrees per radian */
const DEG_PER_RAD = 180 / Math.PI;

/** Radians per degree */
const RAD_PER_DEG = Math.PI / 180;

/** 2π constant */
const TAU = 2 * Math.PI;

/* ═══════════════════════════════════════════════════════════════
   CONVERTERS
   ═══════════════════════════════════════════════════════════════ */

/** Degrees → Radians */
export const degreesToRadians = (deg: Degrees): Radians => deg * RAD_PER_DEG;

/** Radians → Degrees */
export const radiansToDegrees = (rad: Radians): Degrees => rad * DEG_PER_RAD;

/** Degrees → Turns */
export const degreesToTurns = (deg: Degrees): Turns => deg / 360;

/** Turns → Degrees */
export const turnsToDegrees = (t: Turns): Degrees => t * 360;

/** Radians → Turns */
export const radiansToTurns = (rad: Radians): Turns => rad / TAU;

/** Turns → Radians */
export const turnsToRadians = (t: Turns): Radians => t * TAU;

/* ═══════════════════════════════════════════════════════════════
   ANGLE UTILITIES
   ═══════════════════════════════════════════════════════════════ */

/**
 * Normalize an angle in degrees to the range [0, 360).
 */
export function normalizeDegrees(deg: Degrees): Degrees {
  return ((deg % 360) + 360) % 360;
}

/**
 * Normalize an angle in radians to the range [0, 2π).
 */
export function normalizeRadians(rad: Radians): Radians {
  return ((rad % TAU) + TAU) % TAU;
}

/**
 * Normalize an angle in turns to the range [0, 1).
 */
export function normalizeTurns(t: Turns): Turns {
  return ((t % 1) + 1) % 1;
}

/* ═══════════════════════════════════════════════════════════════
   TYPE FAMILIES: Useful unions for function parameters
   ═══════════════════════════════════════════════════════════════ */

/** Any angle unit */
export type AngleUnit = Degrees | Radians | Turns;
