/**
 * Type-only tests for Time unit types and converters.
 */
import { expectTypeOf, test } from 'vitest';
import type { Converter } from '../convert';
import {
  Milliseconds,
  millisecondsToSeconds,
  Seconds,
  secondsToMilliseconds,
} from './time';

// =============================================================================
// Time Unit Tests
// =============================================================================

test('Time types should be properly defined', () => {
  expectTypeOf<Seconds>().toExtend<number>();
  expectTypeOf<Milliseconds>().toExtend<number>();
});

test('Time constructors should return correct types', () => {
  const s: Seconds = 5;
  const ms: Milliseconds = 1000;

  expectTypeOf(s).toEqualTypeOf<Seconds>();
  expectTypeOf(ms).toEqualTypeOf<Milliseconds>();
});

test('Time converters should be type-safe', () => {
  expectTypeOf(secondsToMilliseconds).toEqualTypeOf<
    Converter<Seconds, Milliseconds>
  >();
  expectTypeOf(millisecondsToSeconds).toEqualTypeOf<
    Converter<Milliseconds, Seconds>
  >();
});

test('Different time unit types should not be assignable to each other', () => {
  const sec: Seconds = 1;
  const ms: Milliseconds = 1000;

  expectTypeOf(sec).not.toEqualTypeOf<Milliseconds>();
  expectTypeOf(ms).not.toEqualTypeOf<Seconds>();

  // But all extend number
  expectTypeOf(sec).toExtend<number>();
  expectTypeOf(ms).toExtend<number>();
});
