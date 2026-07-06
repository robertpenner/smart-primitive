/**
 * Type-level tests for Rebase / WithEncoded / NumberString.
 *
 * Uses `const x: T = value` assignment checks so plain `tsc` catches
 * regressions even where `expectTypeOf<T>()` (no-arg form) is permissive.
 */

import { expectTypeOf, test } from 'vitest';

test('NumberString / Rebase / WithEncoded — type-level assertions', () => {});

import type { NumberString, Rebase, WithEncoded } from './rebase';
import type { IsClamped, KindOf, RangeOf, UnitOf } from './trait-utils';
import type { Pixels } from './units/length';
import type { Alpha, ClampedNormalized } from './units/normalized';

/* ───── Plain primitives flow into NumberString ───── */

const pxStr: NumberString<Pixels> = '12px';
expectTypeOf(pxStr).toMatchTypeOf<string>();

/* ───── NumberString<X> structurally distinct from plain string ───── */

// Plain string IS assignable to NumberString<Pixels> by SmartPrimitive design
// (opt-in friendliness), but the two types are not type-equal: NumberString
// carries Unit + Kind + Encoded brand fields plain `string` lacks.
expectTypeOf<NumberString<Pixels>>().not.toEqualTypeOf<string>();
expectTypeOf<NumberString<number>>().not.toEqualTypeOf<string>();

/* ───── Brand preservation: Range + Clamped + Unit + Kind ───── */

const range1: RangeOf<NumberString<ClampedNormalized>> = [0, 1] as const;
void range1;
const clamped1: IsClamped<NumberString<ClampedNormalized>> = true;
void clamped1;

const range2: RangeOf<NumberString<Alpha>> = [0, 1] as const;
void range2;
const kind2: KindOf<NumberString<Alpha>> = 'opacity';
void kind2;

const unit3: UnitOf<NumberString<Pixels>> = 'px';
void unit3;
const kind3: KindOf<NumberString<Pixels>> = 'length';
void kind3;

/* ───── NumberString<number>: still distinct ───── */
// (type-level only; runtime values not produced)

/* ───── Rebase round-trip ───── */

type Roundtrip = Rebase<NumberString<Pixels>, string, number>;

const rt: Roundtrip = 42;
void rt;

const unitR: UnitOf<Roundtrip> = 'px';
void unitR;
const kindR: KindOf<Roundtrip> = 'length';
void kindR;

// Pixels (original) can flow into the rebased-back type, since the rebased
// type carries the same Unit + Kind brands plus an extra encoded brand.
const pixelsVal: Pixels = 10;
const asRoundtrip: Roundtrip = pixelsVal;
void asRoundtrip;

/* ───── WithEncoded carries an actual primitive type ───── */

expectTypeOf<WithEncoded<number>>().not.toEqualTypeOf<WithEncoded<bigint>>();

/* ───── NumberString<X> matches WithEncoded<number> ───── */

expectTypeOf<NumberString<Pixels>>().toMatchTypeOf<WithEncoded<number>>();
