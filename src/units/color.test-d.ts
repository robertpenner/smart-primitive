/**
 * Type-only tests for Color unit types.
 */
import { expectTypeOf, test } from 'vitest';
import { ColorByte, RGBATuple, RGBTuple } from './color';

// =============================================================================
// Color Unit Tests
// =============================================================================

test('ColorByte type should be properly defined', () => {
  expectTypeOf<ColorByte>().toExtend<number>();
});

test('ColorByte constructor should return correct type', () => {
  const red: ColorByte = 255;
  const green: ColorByte = 128;
  const blue: ColorByte = 0;

  expectTypeOf(red).toEqualTypeOf<ColorByte>();
  expectTypeOf(green).toEqualTypeOf<ColorByte>();
  expectTypeOf(blue).toEqualTypeOf<ColorByte>();
});

test('RGBTuple should have named elements', () => {
  const rgb: RGBTuple = [255, 128, 0];

  expectTypeOf(rgb).toEqualTypeOf<RGBTuple>();
  expectTypeOf(rgb[0]).toEqualTypeOf<ColorByte>();
  expectTypeOf(rgb[1]).toEqualTypeOf<ColorByte>();
  expectTypeOf(rgb[2]).toEqualTypeOf<ColorByte>();
});

test('RGBATuple should have named elements', () => {
  const rgba: RGBATuple = [255, 128, 0, 255];

  expectTypeOf(rgba).toEqualTypeOf<RGBATuple>();
  expectTypeOf(rgba[0]).toEqualTypeOf<ColorByte>();
  expectTypeOf(rgba[1]).toEqualTypeOf<ColorByte>();
  expectTypeOf(rgba[2]).toEqualTypeOf<ColorByte>();
  expectTypeOf(rgba[3]).toEqualTypeOf<ColorByte>();
});

test('RGB tuple destructuring should preserve types', () => {
  const rgb: RGBTuple = [255, 0, 128];
  const [r, g, b] = rgb;

  expectTypeOf(r).toEqualTypeOf<ColorByte>();
  expectTypeOf(g).toEqualTypeOf<ColorByte>();
  expectTypeOf(b).toEqualTypeOf<ColorByte>();
});

test('RGBA tuple destructuring should preserve types', () => {
  const rgba: RGBATuple = [255, 0, 128, 200];
  const [r, g, b, a] = rgba;

  expectTypeOf(r).toEqualTypeOf<ColorByte>();
  expectTypeOf(g).toEqualTypeOf<ColorByte>();
  expectTypeOf(b).toEqualTypeOf<ColorByte>();
  expectTypeOf(a).toEqualTypeOf<ColorByte>();
});

test('ColorByte should accept unbranded primitive values', () => {
  const value = 255;
  const color: ColorByte = value; // Should not require casting

  expectTypeOf(color).toEqualTypeOf<ColorByte>();
});
