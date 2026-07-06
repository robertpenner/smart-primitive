/**
 * 🌡️ Temperature Units
 *
 * Trait-based types for temperature values with type-safe conversions.
 */

import type { WithKind, WithUnit } from '../trait-utils';

/* ═══════════════════════════════════════════════════════════════
   TEMPERATURE TYPES
   ═══════════════════════════════════════════════════════════════ */

/**
 * Temperature in Celsius.
 * All temperature types share the 'temperature' kind.
 */
export type Celsius = WithUnit<'celsius'> & WithKind<'temperature'>;

/**
 * Temperature in Fahrenheit.
 * All temperature types share the 'temperature' kind.
 */
export type Fahrenheit = WithUnit<'fahrenheit'> & WithKind<'temperature'>;

/* ═══════════════════════════════════════════════════════════════
   CONVERTERS
   ═══════════════════════════════════════════════════════════════ */

/** Celsius → Fahrenheit */
export const celsiusToFahrenheit = (c: Celsius): Fahrenheit => (c * 9) / 5 + 32;

/** Fahrenheit → Celsius */
export const fahrenheitToCelsius = (f: Fahrenheit): Celsius =>
  ((f - 32) * 5) / 9;
