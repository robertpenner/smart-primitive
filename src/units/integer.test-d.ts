/**
 * Type-only tests for Integer trait and Index type.
 */
import { expectTypeOf, test } from 'vitest';
import type { WithInteger } from '../trait-utils';
import type { Index } from './integer';

test('Index extends number', () => {
  expectTypeOf<Index>().toExtend<number>();
});

test('Index has Integer trait', () => {
  expectTypeOf<Index>().toExtend<WithInteger>();
});

test('plain number is assignable to Index', () => {
  const i: Index = 0;
  expectTypeOf(i).toEqualTypeOf<Index>();
});

test('WithInteger is assignable from plain number', () => {
  const n: WithInteger = 42;
  expectTypeOf(n).toMatchTypeOf<number>();
});
