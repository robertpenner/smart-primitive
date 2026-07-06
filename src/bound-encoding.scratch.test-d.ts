/**
 * Scratch file: Prototype Option A — Composable orthogonal bound traits.
 *
 * See GitHub issue #336.
 */

import { describe, expectTypeOf, test } from 'vitest';
import type {
  MaxExclusiveOf,
  MaxInclusiveOf,
  MinExclusiveOf,
  MinInclusiveOf,
  WithMaxExclusive,
  WithMaxInclusive,
  WithMinExclusive,
  WithMinInclusive,
} from './trait-utils';

/* ═══════════════════════════════════════════════════════════════
   OPTION A — Four composable orthogonal bound traits

   WithMinInclusive<Min>   x >= Min
   WithMinExclusive<Min>   x > Min
   WithMaxInclusive<Max>   x <= Max
   WithMaxExclusive<Max>   x < Max

   Compose freely: number & WithMinInclusive<0> & WithMaxExclusive<1>  → [0, 1)
   ═══════════════════════════════════════════════════════════════ */

describe('Option A — composable orthogonal bound traits', () => {
  test('compose [0, 1) — half-open interval', () => {
    type HalfOpen = number & WithMinInclusive<0> & WithMaxExclusive<1>;
    const t: HalfOpen = 0.5;
    expectTypeOf(t).toExtend<number>();
    expectTypeOf(t).toExtend<WithMinInclusive<0>>();
    expectTypeOf(t).toExtend<WithMaxExclusive<1>>();
  });

  test('compose (0, 1) — open interval', () => {
    type Open = number & WithMinExclusive<0> & WithMaxExclusive<1>;
    const t: Open = 0.5;
    expectTypeOf(t).toExtend<WithMinExclusive<0>>();
    expectTypeOf(t).toExtend<WithMaxExclusive<1>>();
  });

  test('compose [0, 1] — closed interval', () => {
    type Closed = number & WithMinInclusive<0> & WithMaxInclusive<1>;
    const t: Closed = 1;
    expectTypeOf(t).toExtend<WithMinInclusive<0>>();
    expectTypeOf(t).toExtend<WithMaxInclusive<1>>();
  });

  test('compose (-∞, 100] — upper bound only', () => {
    type Capped = number & WithMaxInclusive<100>;
    const t: Capped = -999;
    expectTypeOf(t).toExtend<WithMaxInclusive<100>>();
  });

  test('different bounds are incompatible types', () => {
    type HalfOpen01 = number & WithMinInclusive<0> & WithMaxExclusive<1>;
    type HalfOpen02 = number & WithMinInclusive<0> & WithMaxExclusive<2>;

    const a: HalfOpen01 = 0.5;
    const b: HalfOpen02 = 1.5;

    expectTypeOf(a).not.toEqualTypeOf<HalfOpen02>();
    expectTypeOf(b).not.toEqualTypeOf<HalfOpen01>();
  });

  test('inclusive vs exclusive bounds are distinct types', () => {
    type Inclusive = number & WithMinInclusive<0>;
    type Exclusive = number & WithMinExclusive<0>;

    const incl: Inclusive = 0;
    const excl: Exclusive = 0;

    expectTypeOf(incl).not.toEqualTypeOf<Exclusive>();
    expectTypeOf(excl).not.toEqualTypeOf<Inclusive>();
  });

  test('MinInclusiveOf extracts min', () => {
    type T = number & WithMinInclusive<5>;
    expectTypeOf<MinInclusiveOf<T>>().toEqualTypeOf<5>();
  });

  test('MaxExclusiveOf extracts max', () => {
    type T = number & WithMaxExclusive<100>;
    expectTypeOf<MaxExclusiveOf<T>>().toEqualTypeOf<100>();
  });

  test('MinExclusiveOf returns never when trait absent', () => {
    type T = number & WithMinInclusive<0>;
    expectTypeOf<MinExclusiveOf<T>>().toEqualTypeOf<never>();
  });

  test('MaxInclusiveOf returns never when trait absent', () => {
    type T = number & WithMaxExclusive<1>;
    expectTypeOf<MaxInclusiveOf<T>>().toEqualTypeOf<never>();
  });
});
