/**
 * Type-only tests for Normalized unit types and converters.
 */
import { expectTypeOf, test } from 'vitest';
import type { Converter } from '../convert';
import {
  ClampedNormalized,
  clampNormalized,
  Normalized,
  normalizedToPercentage,
  Percentage,
  percentageToNormalized,
} from './normalized';

// =============================================================================
// Normalized Unit Tests
// =============================================================================

test('Normalized types should be properly defined', () => {
  expectTypeOf<Normalized>().toExtend<number>();
  expectTypeOf<Percentage>().toExtend<number>();
});

test('Normalized constructors should return correct types', () => {
  const n: Normalized = 0.5;
  const p: Percentage = 50;

  expectTypeOf(n).toEqualTypeOf<Normalized>();
  expectTypeOf(p).toEqualTypeOf<Percentage>();
});

test('Normalized converters should be type-safe', () => {
  expectTypeOf(normalizedToPercentage).toEqualTypeOf<
    Converter<Normalized, Percentage>
  >();
  expectTypeOf(percentageToNormalized).toEqualTypeOf<
    Converter<Percentage, Normalized>
  >();
});

test('Normalized utilities should preserve types', () => {
  const n: Normalized = 1.5;
  const clamped = clampNormalized(n);
  expectTypeOf(clamped).toEqualTypeOf<ClampedNormalized>();
});

test('Different normalized unit types should not be assignable to each other', () => {
  const n: Normalized = 0.5;
  const p: Percentage = 50;

  expectTypeOf(n).not.toEqualTypeOf<Percentage>();
  expectTypeOf(p).not.toEqualTypeOf<Normalized>();

  // But both extend number
  expectTypeOf(n).toExtend<number>();
  expectTypeOf(p).toExtend<number>();
});
