/**
 * Type-only tests for Length unit types and converters.
 */
import { expectTypeOf, test } from 'vitest';
import { Ems, emsToPixels, Pixels, pixelsToEms } from './length';

// =============================================================================
// Length Unit Tests
// =============================================================================

test('Length types should be properly defined', () => {
  expectTypeOf<Pixels>().toExtend<number>();
  expectTypeOf<Ems>().toExtend<number>();
});

test('Length constructors should return correct types', () => {
  const px: Pixels = 100;
  const em: Ems = 2;

  expectTypeOf(px).toEqualTypeOf<Pixels>();
  expectTypeOf(em).toEqualTypeOf<Ems>();
});

test('Context-dependent length converters should be type-safe', () => {
  // Curried converters - pixelsToEms(fontSize) returns a converter function
  const pxToEm16 = pixelsToEms(16);
  const emToPx16 = emsToPixels(16);

  // The returned converter should have correct input/output types
  const px: Pixels = 32;
  const result = pxToEm16(px);
  expectTypeOf(result).toEqualTypeOf<Ems>();

  const em: Ems = 2;
  const pxResult = emToPx16(em);
  expectTypeOf(pxResult).toEqualTypeOf<Pixels>();
});

test('Different length unit types should not be assignable to each other', () => {
  const px: Pixels = 100;
  const em: Ems = 2;

  expectTypeOf(px).not.toEqualTypeOf<Ems>();
  expectTypeOf(em).not.toEqualTypeOf<Pixels>();

  // But both extend number
  expectTypeOf(px).toExtend<number>();
  expectTypeOf(em).toExtend<number>();
});
