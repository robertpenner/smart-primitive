/**
 * Runtime tests for intersection-based traits system.
 */

import { describe, expect, expectTypeOf, test } from 'vitest';
import {
  clamp,
  type WithClamped,
  type WithKind,
  type WithPeriodic,
  type WithRange,
  type WithUnit,
} from './trait-utils';
import type { Degrees } from './units/angle';
import type {
  ClampedNormalized,
  Normalized,
  Percentage,
} from './units/normalized';

describe('clamp function', () => {
  test('clamps values above max', () => {
    const value: Normalized = 1.5;
    const result = clamp(value, 0, 1);
    expect(result).toBe(1);
  });

  test('clamps values below min', () => {
    const value: Normalized = -0.5;
    const result = clamp(value, 0, 1);
    expect(result).toBe(0);
  });

  test('preserves in-range values', () => {
    const value: Normalized = 0.5;
    const result = clamp(value, 0, 1);
    expect(result).toBe(0.5);
  });

  test('handles edge values', () => {
    const min: Normalized = 0;
    const max: Normalized = 1;
    expect(clamp(min, 0, 1)).toBe(0);
    expect(clamp(max, 0, 1)).toBe(1);
  });
});

describe('Normalized type', () => {
  test('accepts plain numbers', () => {
    const value: Normalized = 0.5;
    expect(value).toBe(0.5);
  });

  test('can exceed range (unclamped)', () => {
    const value: Normalized = 1.5;
    expect(value).toBe(1.5);
  });

  test('can be negative (unclamped)', () => {
    const value: Normalized = -0.5;
    expect(value).toBe(-0.5);
  });
});

describe('ClampedNormalized type', () => {
  test('accepts plain numbers', () => {
    const value: ClampedNormalized = 0.5;
    expect(value).toBe(0.5);
  });

  test('created from clamping operation', () => {
    const unclamped: Normalized = 1.5;
    const clamped = clamp(unclamped, 0, 1);
    expect(clamped).toBe(1);
  });
});

describe('Percentage type', () => {
  test('accepts values in range', () => {
    const value: Percentage = 75;
    expect(value).toBe(75);
  });

  test('can exceed range (unclamped)', () => {
    const value: Percentage = 150;
    expect(value).toBe(150);
  });
});

describe('Type workflows', () => {
  test('clamp workflow', () => {
    const unclamped: Normalized = 1.5;
    const clamped = clamp(unclamped, 0, 1);
    expect(clamped).toBe(1);
  });

  test('percentage to normalized conversion', () => {
    const percent: Percentage = 75;
    const normalized = (percent / 100) as Normalized;
    expect(normalized).toBe(0.75);
  });

  test('percentage to clamped normalized', () => {
    const percent: Percentage = 150;
    const normalized = (percent / 100) as Normalized;
    const clamped = clamp(normalized, 0, 1);
    expect(clamped).toBe(1);
  });
});

describe('clamp preserves orthogonal traits', () => {
  test('runtime: clamps Degrees value correctly', () => {
    const angle: Degrees = 400;
    const clamped = clamp(angle, 0, 360);
    expect(clamped).toBe(360);
  });

  test('type: result has ALL traits from Degrees', () => {
    const angle: Degrees = 400;
    const clamped = clamp(angle, 0, 360);

    // This should fail with current implementation - clamped doesn't have units
    type Expected = number &
      WithUnit<'degrees'> &
      WithKind<'angle'> &
      WithPeriodic &
      WithRange<0, 360> &
      WithClamped;

    const test: Expected = clamped; // This should cause a type error if traits aren't preserved

    // Also test that we can assign to Degrees type
    const backToDegrees: Degrees & WithClamped = clamped; // Should fail without trait preservation

    expect(test).toBe(360);
    expect(backToDegrees).toBe(360);
  });

  test('type: preserves Units trait from Degrees', () => {
    const angle: Degrees = 400;
    const clamped = clamp(angle, 0, 360);
    // Should preserve units='degrees'
    expectTypeOf(clamped).toMatchTypeOf<WithUnit<'degrees'>>();
  });

  test('type: preserves Archetype trait from Degrees', () => {
    const angle: Degrees = 400;
    const clamped = clamp(angle, 0, 360);
    // Should preserve archetype='angle'
    expectTypeOf(clamped).toMatchTypeOf<WithKind<'angle'>>();
  });

  test('type: preserves Periodic trait from Degrees', () => {
    const angle: Degrees = 400;
    const clamped = clamp(angle, 0, 360);
    // Should preserve periodic trait
    expectTypeOf(clamped).toMatchTypeOf<WithPeriodic>();
  });

  test('type: adds new Range trait', () => {
    const angle: Degrees = 400;
    const clamped = clamp(angle, 0, 360);
    // Should have Range<0, 360> (same as input, but explicitly set)
    expectTypeOf(clamped).toMatchTypeOf<WithRange<0, 360>>();
  });

  test('type: adds Clamped trait', () => {
    const angle: Degrees = 400;
    const clamped = clamp(angle, 0, 360);
    // Should have Clamped trait
    expectTypeOf(clamped).toMatchTypeOf<WithClamped>();
  });

  test('type: preserves Units from Percentage', () => {
    const percent: Percentage = 150;
    const clamped = clamp(percent, 0, 100);
    // Should preserve units='percent'
    expectTypeOf(clamped).toMatchTypeOf<WithUnit<'percent'>>();
  });

  test('runtime: can change range when clamping', () => {
    const angle: Degrees = 400;
    const clamped = clamp(angle, -180, 180);
    expect(clamped).toBe(180);
  });

  test('type: updates Range when clamping to different bounds', () => {
    const angle: Degrees = 400;
    const clamped = clamp(angle, -180, 180);
    // Should have new Range<-180, 180>
    expectTypeOf(clamped).toMatchTypeOf<WithRange<-180, 180>>();
    // But still preserve Units and Archetype
    expectTypeOf(clamped).toMatchTypeOf<
      WithUnit<'degrees'> & WithKind<'angle'>
    >();
  });
});
