/**
 * Type-only tests for Velocity unit types and operations.
 */
import { expectTypeOf, test } from 'vitest';
import type { WithKind } from '../trait-utils';
import { Pixels } from './length';
import { Seconds } from './time';
import {
  applyVelocity,
  PixelsPerSecond,
  Velocity,
  velocityFromValues,
} from './velocity';

// =============================================================================
// Velocity Unit Tests
// =============================================================================

test('Velocity type should compose correctly', () => {
  expectTypeOf<Velocity<Pixels, Seconds>>().toExtend<number>();
  expectTypeOf<PixelsPerSecond>().toExtend<number>();
});

test('Velocity constructor should return correct type', () => {
  const v: Velocity<Pixels, Seconds> = 100;
  expectTypeOf(v).toEqualTypeOf<PixelsPerSecond>();
});

test('Velocity operations should be type-safe', () => {
  const px: Pixels = 100;
  const s: Seconds = 2;
  const v = velocityFromValues(px, s);

  expectTypeOf(v).toEqualTypeOf<Velocity<Pixels, Seconds>>();
});

test('applyVelocity should return correct distance type', () => {
  const v: Velocity<Pixels, Seconds> = 100;
  const s: Seconds = 2;
  const distance = applyVelocity(v, s);

  expectTypeOf(distance).toEqualTypeOf<Pixels>();
});

test('a typed velocity satisfies a unit-less velocity of the same kind', () => {
  type AbstractLength = WithKind<'length'>;
  const px: PixelsPerSecond = 100;
  const _unitless: Velocity<AbstractLength, Seconds> = px;
});
