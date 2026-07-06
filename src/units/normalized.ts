/**
 * 📊 Normalized & Percentage Units
 *
 * Trait-based types for normalized values (0-1) and percentages (0-100).
 */

import type {
  WithClamped,
  WithKind,
  WithRange,
  WithUnit,
} from '../trait-utils';

/* ═══════════════════════════════════════════════════════════════
   NORMALIZED TYPES
   ═══════════════════════════════════════════════════════════════ */

/**
 * A value normalized to the range [0, 1], unclamped.
 * Can exceed these bounds.
 */
export type Normalized = WithRange<0, 1> & WithUnit<'1'>;

/**
 * A clamped normalized value in the range [0, 1].
 * Constrained to not exceed these bounds.
 */
export type ClampedNormalized = Normalized & WithClamped;

/**
 * A value normalized to the range [-1, 1], unclamped.
 * Can exceed these bounds.
 */
export type SignedNormalized = WithRange<-1, 1> & WithUnit<'1'>;

/**
 * A percentage value based on the range [0, 100], unclamped.
 */
export type Percentage = WithRange<0, 100> & WithUnit<'percent'>;

/**
 * An alpha/opacity value in the range [0, 1].
 */
export type Alpha = WithRange<0, 1> & WithKind<'opacity'>;

/**
 * A ratio value (typically positive).
 */
export type Ratio = number;

/**
 * A factor/multiplier value (could be positive or negative).
 */
export type Factor = number;

/* ═══════════════════════════════════════════════════════════════
   ANIMATION-SPECIFIC NORMALIZED TYPES
   ═══════════════════════════════════════════════════════════════ */

/**
 * Normalized time [0, 1] within an animation segment.
 * Used as the input to easing functions (horizontal/time axis).
 * STRICTLY BOUNDED to [0, 1] - cannot overshoot.
 *
 * @example
 * ```ts
 * const joinTime: NormalizedTime = 0.6;
 * const bezierX1: NormalizedTime = 0.42; // Bezier X coordinates use time
 * ```
 */
export type NormalizedTime = ClampedNormalized & WithKind<'time'>;

/**
 * Normalized progress [0, 1] of an animation.
 * Used as the output of easing functions (vertical/progress axis).
 * CAN OVERSHOOT [0, 1] during back/elastic effects (e.g., 1.2 or -0.1).
 *
 * The "normalized" refers to the scale (0-1 reference), not the bounds.
 *
 * @example
 * ```ts
 * const position: NormalizedProgress = 1.2; // Can overshoot
 * const bezierY1: NormalizedProgress = 1.5; // Bezier Y coordinates use progress
 * const restitution: NormalizedProgress = 0.8; // Ratios also use progress
 * ```
 */
export type NormalizedProgress = Normalized & WithKind<'progress'>;

/**
 * Progress expressed as a percentage [0, 100].
 * Used for API parameters and user-facing values.
 *
 * @example
 * ```ts
 * const decay: PercentProgress = 90; // 90% decay
 * const overshoot: PercentProgress = 30; // 30% overshoot
 * ```
 */
export type PercentProgress = Percentage & WithKind<'progress'>;

/* ═══════════════════════════════════════════════════════════════
   CONVERTERS
   ═══════════════════════════════════════════════════════════════ */

/** Normalized → Percentage (0-1 → 0-100) */
export const normalizedToPercentage = (n: Normalized): Percentage => n * 100;

/** Percentage → Normalized (0-100 → 0-1) */
export const percentageToNormalized = (p: Percentage): Normalized => p / 100;

/** NormalizedProgress → PercentProgress (0-1 → 0-100) */
export const normalizedProgressToPercent = (
  n: NormalizedProgress,
): PercentProgress => n * 100;

/** PercentProgress → NormalizedProgress (0-100 → 0-1) */
export const percentToNormalizedProgress = (
  p: PercentProgress,
): NormalizedProgress => p / 100;

/* ═══════════════════════════════════════════════════════════════
   UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════════════ */

/**
 * Clamp a normalized value to [0, 1].
 * NaN is clamped to 0.
 * Preserves branded traits from the input type.
 *
 * @example
 * clampNormalized(0.5)  // 0.5  — in range, unchanged
 * clampNormalized(1.5)  // 1    — above 1
 * clampNormalized(-0.5) // 0    — below 0
 * clampNormalized(NaN)  // 0    — NaN clamped to 0
 *
 * // Branded traits (e.g. from Smart Primitive) are preserved in the output type:
 *
 * // input is NormalizedProgress, different from NormalizedTime
 * const p: NormalizedProgress = 1.2;
 *
 * // output is NormalizedProgress & ClampedNormalized, not just number & ClampedNormalized
 * const clamped = clampNormalized(p);
 */
export function clampNormalized<T extends number>(n: T): T & ClampedNormalized {
  if (n !== n || n <= 0) return 0 as T & ClampedNormalized;
  if (n >= 1) return 1 as T & ClampedNormalized;
  return n as T & ClampedNormalized;
}

/**
 * Clamp a normalized value to [-1, 1].
 */
export function clampSignedNormalized(n: SignedNormalized): SignedNormalized {
  return Math.max(-1, Math.min(1, n));
}

/**
 * Clamp a percentage value to [0, 100].
 */
export function clampPercentage(p: Percentage): Percentage {
  return Math.max(0, Math.min(100, p));
}

/**
 * Clamp an alpha value to [0, 1].
 */
export function clampAlpha(a: Alpha): Alpha {
  return Math.max(0, Math.min(1, a));
}
