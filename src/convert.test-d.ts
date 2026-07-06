/**
 * Type-only tests for Conversion utilities.
 */
import { expectTypeOf, test } from 'vitest';
import {
  type BiConverter,
  type Converter,
  chain,
  createBiConverter,
  createConverter,
  createLinearConverter,
} from './convert';
import { SmartNumber } from './SmartPrimitive';

// =============================================================================
// Conversion Factory Tests
// =============================================================================

test('createConverter should produce type-safe converters', () => {
  type CustomA = SmartNumber<'CustomA'>;
  type CustomB = SmartNumber<'CustomB'>;

  const converter = createConverter<CustomA, CustomB>(n => n * 2);
  expectTypeOf(converter).toEqualTypeOf<Converter<CustomA, CustomB>>();
});

test('createBiConverter should produce type-safe bi-directional converters', () => {
  type CustomA = SmartNumber<'CustomA'>;
  type CustomB = SmartNumber<'CustomB'>;

  const biConverter = createBiConverter<CustomA, CustomB>(
    n => n * 2,
    n => n / 2,
  );
  expectTypeOf(biConverter).toEqualTypeOf<BiConverter<CustomA, CustomB>>();
  expectTypeOf(biConverter.to).toEqualTypeOf<Converter<CustomA, CustomB>>();
  expectTypeOf(biConverter.from).toEqualTypeOf<Converter<CustomB, CustomA>>();
});

test('createLinearConverter should produce type-safe linear converters', () => {
  type Meters = SmartNumber<'Meters'>;
  type Centimeters = SmartNumber<'Centimeters'>;

  const metersCm = createLinearConverter<Meters, Centimeters>(100);
  expectTypeOf(metersCm).toEqualTypeOf<BiConverter<Meters, Centimeters>>();
});

test('chain should compose converters correctly', () => {
  type A = SmartNumber<'A'>;
  type B = SmartNumber<'B'>;
  type C = SmartNumber<'C'>;

  const aToB = createConverter<A, B>(n => n * 2);
  const bToC = createConverter<B, C>(n => n + 1);
  const aToC = chain(aToB, bToC);

  expectTypeOf(aToC).toEqualTypeOf<Converter<A, C>>();
});
