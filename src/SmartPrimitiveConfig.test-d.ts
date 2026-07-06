/**
 * Type-only tests for SmartPrimitiveConfig module augmentation.
 *
 * These tests verify that:
 * 1. The default config keeps branded types active
 * 2. The UsePlainPrimitives type resolves correctly from the config interface
 * 3. SmartPrimitiveConfig is augmentable (demonstrated in the companion demo)
 */
import { expectTypeOf, test } from 'vitest';
import type {
  SmartNumber,
  SmartPrimitiveConfig,
  SmartString,
  Unbrand,
  UsePlainPrimitives,
} from './SmartPrimitive';

// =============================================================================
// Default Config Tests
// =============================================================================

test('default config is an empty interface', () => {
  expectTypeOf<SmartPrimitiveConfig>().toEqualTypeOf<{}>();
});

test('UsePlainPrimitives resolves to false by default', () => {
  expectTypeOf<UsePlainPrimitives>().toEqualTypeOf<false>();
});

// =============================================================================
// Branded Behavior (default config)
// =============================================================================

type Pixels = SmartNumber<'Pixels'>;
type Milliseconds = SmartNumber<'Milliseconds'>;
type URL = SmartString<'URL'>;

test('with default config, different SmartNumber brands are distinct', () => {
  expectTypeOf<Pixels>().not.toEqualTypeOf<Milliseconds>();
});

test('with default config, SmartNumber extends number', () => {
  expectTypeOf<Pixels>().toExtend<number>();
});

test('with default config, SmartString extends string', () => {
  expectTypeOf<URL>().toExtend<string>();
});

test('with default config, Unbrand strips brands', () => {
  expectTypeOf<Unbrand<Pixels>>().toEqualTypeOf<number>();
  expectTypeOf<Unbrand<URL>>().toEqualTypeOf<string>();
});

test('with default config, plain values are assignable to SmartNumber', () => {
  const px: Pixels = 100;
  expectTypeOf(px).toEqualTypeOf<Pixels>();
});
