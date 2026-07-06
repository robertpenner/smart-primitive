/**
 * 🏷️ Trait System Utilities
 *
 * Core trait interfaces and wrapper types for the orthogonal trait system.
 * These are used across all unit type definitions to provide composable,
 * flag-aware type annotations.
 */

import type { UsePlainPrimitives } from './SmartPrimitive';

/* ═══════════════════════════════════════════════════════════════
   CORE TRAIT INTERFACES (Internal)
   ═══════════════════════════════════════════════════════════════ */

interface Unit<U extends string> {
  readonly _unit?: U;
}

interface Range<Min extends number, Max extends number> {
  readonly _range?: { readonly min: Min; readonly max: Max };
}

interface RangeAbove<Min extends number> {
  readonly _rangeAbove?: { readonly min: Min };
}

interface RangeBelow<Max extends number> {
  readonly _rangeBelow?: { readonly max: Max };
}

interface Clamped {
  readonly _clamped?: true;
}

interface Periodic {
  readonly _periodic?: true;
}

interface Kind<K extends string> {
  readonly _kind?: K;
}

interface Integer {
  readonly _integer?: true;
}

interface MinInclusive<Min extends number> {
  readonly _minInclusive?: { readonly min: Min };
}

interface MinExclusive<Min extends number> {
  readonly _minExclusive?: { readonly min: Min };
}

interface MaxInclusive<Max extends number> {
  readonly _maxInclusive?: { readonly max: Max };
}

interface MaxExclusive<Max extends number> {
  readonly _maxExclusive?: { readonly max: Max };
}

/* ═══════════════════════════════════════════════════════════════
   EXPORTED TRAIT WRAPPERS (Flag-Aware)
   ═══════════════════════════════════════════════════════════════ */

/**
 * Marks a number with measurement units.
 */
export type WithUnit<U extends string> = number &
  (UsePlainPrimitives extends true ? {} : Unit<U>);

/**
 * Marks a number as having a closed reference range [Min, Max].
 */
export type WithRange<Min extends number, Max extends number> = number &
  (UsePlainPrimitives extends true ? {} : Range<Min, Max>);

/**
 * Marks a number as having a lower bound [Min, ∞).
 *
 * Use for half-open ranges where only the minimum is meaningful.
 *
 * @deprecated Use `WithMinInclusive<Min>` instead.
 *
 * @example
 * ```ts
 * // Initial velocity must be > 2
 * v0: NormalizedVelocity & WithRangeAbove<2>
 * ```
 */
export type WithRangeAbove<Min extends number> = number &
  (UsePlainPrimitives extends true ? {} : RangeAbove<Min>);

/**
 * Marks a number as having an upper bound (−∞, Max].
 *
 * Use for half-open ranges where only the maximum is meaningful.
 *
 * @deprecated Use `WithMaxInclusive<Max>` instead.
 *
 * @example
 * ```ts
 * // Damping ratio capped at 6
 * zeta: WithRangeBelow<6>
 * ```
 */
export type WithRangeBelow<Max extends number> = number &
  (UsePlainPrimitives extends true ? {} : RangeBelow<Max>);

/**
 * Marks a number as having an inclusive lower bound (x >= Min).
 *
 * Compose with `WithMaxInclusive` or `WithMaxExclusive` to form closed or half-open intervals.
 *
 * @example
 * ```ts
 * // [0, 1) — includes 0, excludes 1
 * type Progress = number & WithMinInclusive<0> & WithMaxExclusive<1>;
 * ```
 */
export type WithMinInclusive<Min extends number> = number &
  (UsePlainPrimitives extends true ? {} : MinInclusive<Min>);

/**
 * Marks a number as having an exclusive lower bound (x > Min).
 *
 * @example
 * ```ts
 * // (0, ∞) — strictly positive
 * type StrictlyPositive = number & WithMinExclusive<0>;
 * ```
 */
export type WithMinExclusive<Min extends number> = number &
  (UsePlainPrimitives extends true ? {} : MinExclusive<Min>);

/**
 * Marks a number as having an inclusive upper bound (x <= Max).
 *
 * @example
 * ```ts
 * // (−∞, 1] — at most 1
 * type AtMostOne = number & WithMaxInclusive<1>;
 * ```
 */
export type WithMaxInclusive<Max extends number> = number &
  (UsePlainPrimitives extends true ? {} : MaxInclusive<Max>);

/**
 * Marks a number as having an exclusive upper bound (x < Max).
 *
 * @example
 * ```ts
 * // [0, 1) — typical normalized progress excluding endpoint
 * type Progress = number & WithMinInclusive<0> & WithMaxExclusive<1>;
 * ```
 */
export type WithMaxExclusive<Max extends number> = number &
  (UsePlainPrimitives extends true ? {} : MaxExclusive<Max>);

/**
 * Marks a number as being clamped (constrained) to its range.
 */
export type WithClamped = number &
  (UsePlainPrimitives extends true ? {} : Clamped);

/**
 * Marks a number as periodic (wrapping around at boundaries).
 */
export type WithPeriodic = number &
  (UsePlainPrimitives extends true ? {} : Periodic);

/**
 * Groups related unit types under a common archetype/kind.
 * Does not include a primitive base — compose with `number &` or another primitive.
 */
// biome-ignore lint/complexity/noBannedTypes: {} intentionally means "no brand" in plain-primitive mode
export type WithKind<K extends string> = UsePlainPrimitives extends true
  ? {}
  : Kind<K>;

/**
 * Marks a number as an integer (whole number).
 */
export type WithInteger = number &
  (UsePlainPrimitives extends true ? {} : Integer);

/* ═══════════════════════════════════════════════════════════════
   TYPE EXTRACTION UTILITIES
   ═══════════════════════════════════════════════════════════════ */

/**
 * Extract units from a type.
 * @returns The unit string, or never if type has no Units trait.
 */
export type UnitOf<T> = T extends Unit<infer U> ? U : never;

/**
 * Extract range from a type as a tuple [Min, Max].
 * @returns [Min, Max] tuple, or never if type has no Range trait.
 */
export type RangeOf<T> =
  T extends Range<infer Min, infer Max> ? readonly [Min, Max] : never;

/**
 * Extract min value from range trait.
 * @returns Min value, or never if type has no Range trait.
 */
export type MinOf<T> = T extends Range<infer Min, infer _Max> ? Min : never;

/**
 * Extract max value from range trait.
 * @returns Max value, or never if type has no Range trait.
 */
export type MaxOf<T> = T extends Range<infer _Min, infer Max> ? Max : never;

/**
 * Check if a type has the Clamped trait.
 * @returns true if clamped, false if not.
 */
export type IsClamped<T> = T extends Clamped ? true : false;

/**
 * Check if a type has the Periodic trait.
 * @returns true if periodic, false if not.
 */
export type IsPeriodic<T> = T extends Periodic ? true : false;

/**
 * Extract kind/archetype from a type.
 * @returns The kind string, or never if type has no Kind trait.
 */
export type KindOf<T> = T extends Kind<infer K> ? K : never;

/**
 * Extract inclusive minimum from a type.
 * @returns The Min value, or never if the type has no MinInclusive trait.
 */
export type MinInclusiveOf<T> = T extends MinInclusive<infer Min> ? Min : never;

/**
 * Extract exclusive minimum from a type.
 * @returns The Min value, or never if the type has no MinExclusive trait.
 */
export type MinExclusiveOf<T> = T extends MinExclusive<infer Min> ? Min : never;

/**
 * Extract inclusive maximum from a type.
 * @returns The Max value, or never if the type has no MaxInclusive trait.
 */
export type MaxInclusiveOf<T> = T extends MaxInclusive<infer Max> ? Max : never;

/**
 * Extract exclusive maximum from a type.
 * @returns The Max value, or never if the type has no MaxExclusive trait.
 */
export type MaxExclusiveOf<T> = T extends MaxExclusive<infer Max> ? Max : never;

/* ═══════════════════════════════════════════════════════════════
   TRAIT MODIFICATION UTILITIES
   ═══════════════════════════════════════════════════════════════ */

/**
 * Remove the Clamped trait from a type (return to unclamped).
 */
export type WithoutClamped<T> = T extends Clamped ? Omit<T, '_clamped'> : T;

/**
 * Remove the Periodic trait from a type.
 */
export type WithoutPeriodic<T> = T extends Periodic ? Omit<T, '_periodic'> : T;

/**
 * Change the units of a type (unit conversion).
 */
export type ChangeUnits<T, U extends string> = Omit<T, '_unit'> & WithUnit<U>;

/**
 * Change the range of a type.
 */
export type ChangeRange<T, Min extends number, Max extends number> = Omit<
  T,
  '_range'
> &
  WithRange<Min, Max>;

/* ═══════════════════════════════════════════════════════════════
   RUNTIME UTILITIES
   ═══════════════════════════════════════════════════════════════ */

/**
 * Clamp a value to specified bounds, preserve orthogonal traits, and mark as clamped.
 */
export function clamp<T extends number, Min extends number, Max extends number>(
  value: T,
  min: Min,
  max: Max,
): WithRange<Min, Max> & WithClamped {
  return Math.min(Math.max(value, min), max);
}

/**
 * Wrap a value to specified bounds, preserve orthogonal traits, and mark as periodic.
 */
export function wrap<T, Min extends number, Max extends number>(
  value: T,
  min: Min,
  max: Max,
): Omit<T, '_range' | '_periodic'> & WithRange<Min, Max> & WithPeriodic {
  const range = max - min;
  const normalized = ((((value as any) - min) % range) + range) % range;
  return (normalized + min) as any;
}
