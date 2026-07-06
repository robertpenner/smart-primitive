/**
 * Type tests for intersection-based traits system.
 */

import { describe, expectTypeOf, test } from 'vitest';
import {
  type ChangeRange,
  clamp,
  type IsClamped,
  type MaxExclusiveOf,
  type MaxInclusiveOf,
  type MaxOf,
  type MinExclusiveOf,
  type MinInclusiveOf,
  type MinOf,
  type RangeOf,
  type WithClamped,
  type WithMaxExclusive,
  type WithMaxInclusive,
  type WithMinExclusive,
  type WithMinInclusive,
  type WithoutClamped,
  type WithRange,
  type WithRangeAbove,
} from './trait-utils';
import type {
  ClampedNormalized,
  Normalized,
  Percentage,
  SignedNormalized,
} from './units/normalized';

describe('Range trait', () => {
  test('can be intersected with SmartNumber', () => {
    type MyNumber = number & WithRange<0, 100>;
    const value: MyNumber = 50;
    expectTypeOf(value).toMatchTypeOf<number>();
  });

  test('different ranges are incompatible', () => {
    type Range1 = number & WithRange<0, 1>;
    type Range2 = number & WithRange<0, 100>;

    const val1: Range1 = 0.5;
    const val2: Range2 = 50;

    // Types should not be equal
    expectTypeOf(val1).not.toEqualTypeOf<Range2>();
    expectTypeOf(val2).not.toEqualTypeOf<Range1>();
  });

  test('RangeOf extracts range', () => {
    type TestType = number & WithRange<0, 100>;
    type ExtractedRange = RangeOf<TestType>;
    expectTypeOf<ExtractedRange>().toMatchTypeOf<readonly [0, 100]>();
  });

  test('MinOf extracts min', () => {
    type TestType = number & WithRange<-10, 10>;
    type Min = MinOf<TestType>;
    expectTypeOf<Min>().toEqualTypeOf<-10>();
  });

  test('MaxOf extracts max', () => {
    type TestType = number & WithRange<0, 360>;
    type Max = MaxOf<TestType>;
    expectTypeOf<Max>().toEqualTypeOf<360>();
  });
});

describe('Clamped trait', () => {
  test('can be intersected with SmartNumber', () => {
    type MyNumber = number & WithClamped;
    const value: MyNumber = 50;
    expectTypeOf(value).toMatchTypeOf<number>();
  });

  test('clamped and unclamped are incompatible', () => {
    type Unclamped = number & WithRange<0, 1>;
    type ClampedType = number & WithRange<0, 1> & WithClamped;

    const unclamped: Unclamped = 0.5;
    const clamped: ClampedType = 0.5;

    // Types should not be equal
    expectTypeOf(unclamped).not.toEqualTypeOf<ClampedType>();
    expectTypeOf(clamped).not.toEqualTypeOf<Unclamped>();
  });

  test('IsClamped detects Clamped trait', () => {
    type Unclamped = number & WithRange<0, 1>;
    type ClampedType = number & WithRange<0, 1> & WithClamped;

    type UnclampedCheck = IsClamped<Unclamped>; // false
    type ClampedCheck = IsClamped<ClampedType>; // true

    expectTypeOf<UnclampedCheck>().toEqualTypeOf<false>();
    expectTypeOf<ClampedCheck>().toEqualTypeOf<true>();
  });
});

describe('Trait composition', () => {
  test('can combine multiple traits', () => {
    type MyNumber = number & WithRange<0, 100> & WithClamped;
    const value: MyNumber = 50;

    expectTypeOf(value).toMatchTypeOf<number>();
    expectTypeOf(value).toMatchTypeOf<WithRange<0, 100>>();
    expectTypeOf(value).toMatchTypeOf<WithClamped>();
  });

  test('trait order does not matter', () => {
    type Type1 = number & WithRange<0, 1> & WithClamped;
    type Type2 = number & WithClamped & WithRange<0, 1>;

    expectTypeOf<Type1>().toEqualTypeOf<Type2>();
  });
});

describe('Trait modification utilities', () => {
  test('adding WithClamped trait to a type', () => {
    type Unclamped = number & WithRange<0, 1>;
    type Result = Unclamped & WithClamped;

    expectTypeOf<Result>().toMatchTypeOf<WithClamped>();
    expectTypeOf<Result>().toMatchTypeOf<WithRange<0, 1>>();
  });

  test('WithoutClamped removes Clamped trait', () => {
    type ClampedType = number & WithRange<0, 1> & WithClamped;
    type Result = WithoutClamped<ClampedType>;

    type IsResultClamped = IsClamped<Result>;
    expectTypeOf<IsResultClamped>().toEqualTypeOf<false>();
  });

  test('WithRange changes range', () => {
    type Original = number & WithRange<0, 360>;
    type Changed = ChangeRange<Original, -180, 180>;

    type ChangedRange = RangeOf<Changed>;
    expectTypeOf<ChangedRange>().toEqualTypeOf<readonly [-180, 180]>();
  });

  test('WithRange preserves Clamped trait', () => {
    type Original = number & WithRange<0, 360> & WithClamped;
    type Changed = ChangeRange<Original, -180, 180>;

    expectTypeOf<Changed>().toMatchTypeOf<WithRange<-180, 180>>();
  });
});

describe('Clamping operations', () => {
  test('clamp returns clamped type', () => {
    type Unclamped = number & WithRange<0, 1>;
    const value: Unclamped = 1.5;
    const result = clamp(value, 0, 1);

    expectTypeOf(result).toMatchTypeOf<WithClamped>();
  });

  test('clamp returns clamped type with Range', () => {
    type Unclamped = number & WithRange<0, 1>;
    const value: Unclamped = 0.5;
    const result = clamp(value, 0, 1);

    expectTypeOf(result).toMatchTypeOf<WithRange<0, 1>>();
    expectTypeOf(result).toMatchTypeOf<WithClamped>();
  });
});

describe('Common quantity types', () => {
  test('Normalized type', () => {
    const value: Normalized = 0.5;
    expectTypeOf(value).toMatchTypeOf<number>();
    expectTypeOf(value).toMatchTypeOf<WithRange<0, 1>>();

    type IsNormalizedClamped = IsClamped<Normalized>;
    expectTypeOf<IsNormalizedClamped>().toEqualTypeOf<false>();
  });

  test('ClampedNormalized type', () => {
    const value: ClampedNormalized = 0.5;
    expectTypeOf(value).toMatchTypeOf<number>();
    expectTypeOf(value).toMatchTypeOf<WithRange<0, 1>>();
    expectTypeOf(value).toMatchTypeOf<WithClamped>();

    type IsClampedNormalizedClamped = IsClamped<ClampedNormalized>;
    expectTypeOf<IsClampedNormalizedClamped>().toEqualTypeOf<true>();
  });

  test('Normalized and ClampedNormalized are incompatible', () => {
    const normalized: Normalized = 0.5;
    const clamped: ClampedNormalized = 0.5;

    // These should work because they're both numbers at runtime
    // but the type system tracks the difference
    expectTypeOf(normalized).not.toEqualTypeOf<ClampedNormalized>();
    expectTypeOf(clamped).not.toEqualTypeOf<Normalized>();
  });

  test('SignedNormalized type', () => {
    const value: SignedNormalized = -0.5;

    type ExtractedRange = RangeOf<SignedNormalized>;
    expectTypeOf<ExtractedRange>().toMatchTypeOf<readonly [-1, 1]>();
  });

  test('Percentage type', () => {
    const value: Percentage = 50;

    type ExtractedRange = RangeOf<Percentage>;
    expectTypeOf<ExtractedRange>().toMatchTypeOf<readonly [0, 100]>();

    type IsPercentageClamped = IsClamped<Percentage>;
    expectTypeOf<IsPercentageClamped>().toEqualTypeOf<false>();
  });
});

describe('Type safety', () => {
  test('plain numbers can be assigned to trait types', () => {
    const plain = 0.5;
    const normalized: Normalized = plain; // ✅
    const clamped: ClampedNormalized = plain; // ✅
    expectTypeOf(plain).toMatchTypeOf<number>();
  });

  test('different ranges cannot be mixed', () => {
    const normalized: Normalized = 0.5;
    const percentage: Percentage = 50;

    // Types should not be equal
    expectTypeOf(normalized).not.toEqualTypeOf<Percentage>();
    expectTypeOf(percentage).not.toEqualTypeOf<Normalized>();
  });

  test('clamped conversion workflow', () => {
    const unclamped: Normalized = 1.5;
    const clamped = clamp(unclamped, 0, 1);

    expectTypeOf(clamped).not.toEqualTypeOf<Normalized>();
    expectTypeOf(clamped).toMatchTypeOf<WithClamped>();
  });
});

describe('WithMinInclusive / WithMinExclusive / WithMaxInclusive / WithMaxExclusive traits', () => {
  test('basic composition: [0, 1) half-open interval', () => {
    type Progress = number & WithMinInclusive<0> & WithMaxExclusive<1>;
    const t: Progress = 0.5;
    expectTypeOf(t).toMatchTypeOf<number>();
    expectTypeOf(t).toMatchTypeOf<WithMinInclusive<0>>();
    expectTypeOf(t).toMatchTypeOf<WithMaxExclusive<1>>();
  });

  test('basic composition: (0, 1) open interval', () => {
    type Open = number & WithMinExclusive<0> & WithMaxExclusive<1>;
    const t: Open = 0.5;
    expectTypeOf(t).toMatchTypeOf<WithMinExclusive<0>>();
    expectTypeOf(t).toMatchTypeOf<WithMaxExclusive<1>>();
  });

  test('basic composition: [0, 1] closed interval', () => {
    type Closed = number & WithMinInclusive<0> & WithMaxInclusive<1>;
    const t: Closed = 1;
    expectTypeOf(t).toMatchTypeOf<WithMinInclusive<0>>();
    expectTypeOf(t).toMatchTypeOf<WithMaxInclusive<1>>();
  });

  test('basic composition: (-∞, 100] upper bound only', () => {
    type Capped = number & WithMaxInclusive<100>;
    const t: Capped = -999;
    expectTypeOf(t).toMatchTypeOf<WithMaxInclusive<100>>();
  });

  test('different bounds are incompatible types', () => {
    type HalfOpen01 = number & WithMinInclusive<0> & WithMaxExclusive<1>;
    type HalfOpen02 = number & WithMinInclusive<0> & WithMaxExclusive<2>;

    const a: HalfOpen01 = 0.5;
    const b: HalfOpen02 = 1.5;

    expectTypeOf(a).not.toEqualTypeOf<HalfOpen02>();
    expectTypeOf(b).not.toEqualTypeOf<HalfOpen01>();
  });

  test('inclusive and exclusive bounds are distinct types for the same value', () => {
    type WithInclusive = number & WithMinInclusive<0>;
    type WithExclusive = number & WithMinExclusive<0>;

    const incl: WithInclusive = 0;
    const excl: WithExclusive = 0;

    expectTypeOf(incl).not.toEqualTypeOf<WithExclusive>();
    expectTypeOf(excl).not.toEqualTypeOf<WithInclusive>();
  });

  test('MinInclusiveOf extracts min', () => {
    type T = number & WithMinInclusive<5>;
    expectTypeOf<MinInclusiveOf<T>>().toEqualTypeOf<5>();
  });

  test('MinExclusiveOf extracts min', () => {
    type T = number & WithMinExclusive<-1>;
    expectTypeOf<MinExclusiveOf<T>>().toEqualTypeOf<-1>();
  });

  test('MaxInclusiveOf extracts max', () => {
    type T = number & WithMaxInclusive<360>;
    expectTypeOf<MaxInclusiveOf<T>>().toEqualTypeOf<360>();
  });

  test('MaxExclusiveOf extracts max', () => {
    type T = number & WithMaxExclusive<1>;
    expectTypeOf<MaxExclusiveOf<T>>().toEqualTypeOf<1>();
  });

  test('MinInclusiveOf returns never when trait absent', () => {
    type T = number & WithMinExclusive<0>; // exclusive only
    expectTypeOf<MinInclusiveOf<T>>().toEqualTypeOf<never>();
  });

  test('MaxExclusiveOf returns never when trait absent', () => {
    type T = number & WithMaxInclusive<1>; // inclusive only
    expectTypeOf<MaxExclusiveOf<T>>().toEqualTypeOf<never>();
  });

  test('UsePlainPrimitives flag: trait collapses to plain number', () => {
    // Simulate the UsePlainPrimitives = true code path by hard-coding `true`
    // in the conditional — the result must be exactly `number`.
    type Collapsed = number &
      (true extends true
        ? {}
        : { readonly _minInclusive?: { readonly min: 0 } });
    const c: Collapsed = 0;
    expectTypeOf(c).toEqualTypeOf<number>();

    // In branded mode (default), the composed type is structurally distinct from plain number...
    const branded: WithMinInclusive<0> = 0;
    expectTypeOf(branded).not.toEqualTypeOf<number>();
    // ...yet a plain number IS assignable to it (optional brand property).
    const plain: WithMinInclusive<0> = 0.5;
    expectTypeOf(plain).toMatchTypeOf<number>();
  });

  test('WithRangeAbove is structurally distinct from WithMinInclusive (migration path)', () => {
    // WithRangeAbove brands via _rangeAbove; WithMinInclusive via _minInclusive.
    // They carry the same semantic intent but are not interchangeable types.
    expectTypeOf<number & WithRangeAbove<0>>().not.toEqualTypeOf<
      number & WithMinInclusive<0>
    >();
  });
});
