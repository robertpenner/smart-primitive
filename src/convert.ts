/**
 * 🔄 Conversion Utilities for Smart Primitives
 *
 * Type-safe conversion functions between branded types with a clean factory pattern.
 * Supports both one-way and bidirectional conversions.
 */

import type { SmartNumber, SmartString } from './SmartPrimitive';

/* ═══════════════════════════════════════════════════════════════
   CORE CONVERSION TYPES
   ═══════════════════════════════════════════════════════════════ */

/**
 * A type-safe conversion function from one branded type to another.
 *
 * @example
 * ```ts
 * const degreesToRadians: Converter<Degrees, Radians> = (deg) => (deg * Math.PI / 180) as Radians;
 * ```
 */
export type Converter<From, To> = (value: From) => To;

/**
 * A bidirectional converter with forward and reverse operations.
 *
 * @example
 * ```ts
 * const degreesRadians: BiConverter<Degrees, Radians> = {
 *   to: (deg) => (deg * Math.PI / 180) as Radians,
 *   from: (rad) => (rad * 180 / Math.PI) as Degrees,
 * };
 * ```
 */
export interface BiConverter<A, B> {
  /** Convert from A to B */
  to: Converter<A, B>;
  /** Convert from B to A */
  from: Converter<B, A>;
}

/* ═══════════════════════════════════════════════════════════════
   CONVERSION FACTORY
   ═══════════════════════════════════════════════════════════════ */

/**
 * Create a type-safe converter between two branded number types.
 *
 * @param transform - The mathematical transformation function
 * @returns A typed converter function
 *
 * @example
 * ```ts
 * type Celsius = SmartNumber<'Celsius'>;
 * type Fahrenheit = SmartNumber<'Fahrenheit'>;
 *
 * const celsiusToFahrenheit = createConverter<Celsius, Fahrenheit>(c => c * 9/5 + 32);
 * const temp: Fahrenheit = celsiusToFahrenheit(100 as Celsius); // 212
 * ```
 */
export function createConverter<
  From extends SmartNumber<string>,
  To extends SmartNumber<string>,
>(transform: (value: number) => number): Converter<From, To> {
  return ((value: From) => transform(value) as To) as Converter<From, To>;
}

/**
 * Create a bidirectional converter between two branded number types.
 *
 * @param toTransform - Transform from A to B
 * @param fromTransform - Transform from B to A
 * @returns A BiConverter with both directions
 *
 * @example
 * ```ts
 * const celsiusFahrenheit = createBiConverter<Celsius, Fahrenheit>(
 *   c => c * 9/5 + 32,
 *   f => (f - 32) * 5/9
 * );
 *
 * celsiusFahrenheit.to(0 as Celsius);     // 32 as Fahrenheit
 * celsiusFahrenheit.from(32 as Fahrenheit); // 0 as Celsius
 * ```
 */
export function createBiConverter<
  A extends SmartNumber<string>,
  B extends SmartNumber<string>,
>(
  toTransform: (value: number) => number,
  fromTransform: (value: number) => number,
): BiConverter<A, B> {
  return {
    to: createConverter<A, B>(toTransform),
    from: createConverter<B, A>(fromTransform),
  };
}

/**
 * Create a linear converter (multiply by factor).
 * Useful for unit conversions with simple ratios.
 *
 * @param factor - The multiplication factor (A * factor = B)
 * @returns A BiConverter using the linear relationship
 *
 * @example
 * ```ts
 * // 1 meter = 100 centimeters
 * const metersCentimeters = createLinearConverter<Meters, Centimeters>(100);
 *
 * metersCentimeters.to(2 as Meters);       // 200 as Centimeters
 * metersCentimeters.from(50 as Centimeters); // 0.5 as Meters
 * ```
 */
export function createLinearConverter<
  A extends SmartNumber<string>,
  B extends SmartNumber<string>,
>(factor: number): BiConverter<A, B> {
  return createBiConverter<A, B>(
    a => a * factor,
    b => b / factor,
  );
}

/**
 * Create a converter for string types with validation.
 *
 * @param validate - Optional validation function (throws on invalid input)
 * @returns A converter that casts strings to the target type
 *
 * @example
 * ```ts
 * type URL = SmartString<'URL'>;
 *
 * const toURL = createStringConverter<string, URL>((s) => {
 *   if (!s.startsWith('http')) throw new Error('Invalid URL');
 * });
 *
 * const url: URL = toURL('https://example.com'); // ✅
 * const bad: URL = toURL('not-a-url');           // ❌ throws
 * ```
 */
export function createStringConverter<
  From extends string,
  To extends SmartString<string>,
>(validate?: (value: From) => void): Converter<From, To> {
  return ((value: From) => {
    if (validate) validate(value);
    return value as unknown as To;
  }) as Converter<From, To>;
}

/* ═══════════════════════════════════════════════════════════════
   CHAINING & COMPOSITION
   ═══════════════════════════════════════════════════════════════ */

/**
 * Chain two converters together: A → B → C
 *
 * @example
 * ```ts
 * const turnsToRadians = chain(turnsToDegrees, degreesToRadians);
 * ```
 */
export function chain<A, B, C>(
  first: Converter<A, B>,
  second: Converter<B, C>,
): Converter<A, C> {
  return ((value: A) => second(first(value))) as Converter<A, C>;
}

/**
 * Create an identity converter (no-op, for type coercion).
 *
 * @example
 * ```ts
 * const pixelsIdentity = identity<Pixels>();
 * ```
 */
export function identity<T>(): Converter<T, T> {
  return ((value: T) => value) as Converter<T, T>;
}

/* ═══════════════════════════════════════════════════════════════
   CONVERSION REGISTRY (Optional Pattern)
   ═══════════════════════════════════════════════════════════════ */

/**
 * A registry of converters for runtime lookup.
 * Useful when converter selection depends on runtime values.
 *
 * @example
 * ```ts
 * const angleConverters = new ConverterRegistry<Degrees>();
 * angleConverters.register('radians', degreesToRadians);
 * angleConverters.register('turns', degreesToTurns);
 *
 * const converted = angleConverters.convert(90 as Degrees, 'radians');
 * ```
 */
export class ConverterRegistry<From> {
  private converters = new Map<string, Converter<From, unknown>>();

  register<To>(name: string, converter: Converter<From, To>): this {
    this.converters.set(name, converter as Converter<From, unknown>);
    return this;
  }

  convert<To>(value: From, targetName: string): To {
    const converter = this.converters.get(targetName);
    if (!converter) {
      throw new Error(`No converter registered for target: ${targetName}`);
    }
    return converter(value) as To;
  }

  has(targetName: string): boolean {
    return this.converters.has(targetName);
  }
}
