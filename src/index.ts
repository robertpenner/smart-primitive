/**
 * @penner/smart-primitive - Type-safe branded primitives with zero runtime overhead
 *
 * Prevent bugs by distinguishing different kinds of numbers, strings, and booleans
 * at compile time, with no runtime cost.
 *
 * @example
 * ```ts
 * import { SmartNumber, SmartString } from '@penner/smart-primitive';
 *
 * type Pixels = SmartNumber<'Pixels'>;
 * type Milliseconds = SmartNumber<'Milliseconds'>;
 * type URL = SmartString<'URL'>;
 *
 * let width: Pixels = 300;        // ✅ works
 * let delay: Milliseconds = 500;  // ✅ works
 * let oops: Pixels = delay;       // ❌ type error - caught!
 * ```
 */

// Conversion utilities
export type { BiConverter, Converter } from './convert';
export {
  ConverterRegistry,
  chain,
  createBiConverter,
  createConverter,
  createLinearConverter,
  createStringConverter,
  identity,
} from './convert';
// Cross-base brand transport (Rebase, NumberString, WithEncoded)
export type { Base, NumberString, Rebase, WithEncoded } from './rebase';
export type {
  SmartBigInt,
  SmartBoolean,
  SmartNumber,
  SmartPrimitive,
  SmartPrimitiveConfig,
  SmartString,
  SmartSymbol,
  Unbrand,
  UnbrandFn,
  UsePlainPrimitives,
} from './SmartPrimitive';
// CSS string types
export type { CSSEasing } from './strings/css';

// Trait system utilities (intersection-based orthogonal properties)
export type {
  ChangeRange,
  ChangeUnits,
  IsClamped,
  IsPeriodic,
  KindOf,
  MaxExclusiveOf,
  MaxInclusiveOf,
  MaxOf,
  MinExclusiveOf,
  MinInclusiveOf,
  MinOf,
  RangeOf,
  UnitOf,
  WithClamped,
  WithInteger,
  WithKind,
  WithMaxExclusive,
  WithMaxInclusive,
  WithMinExclusive,
  WithMinInclusive,
  WithoutClamped,
  WithoutPeriodic,
  WithPeriodic,
  WithRange,
  WithRangeAbove,
  WithRangeBelow,
  WithUnit,
} from './trait-utils';

export { clamp, wrap } from './trait-utils';
// Re-export all units for better IDE auto-import support
// (Still available via @penner/smart-primitive/units for explicit imports)
export * from './units';

// Note: All unit types (Degrees, Radians, Turns, Pixels, Normalized, etc.)
// are now exported via units/* with self-contained trait definitions
