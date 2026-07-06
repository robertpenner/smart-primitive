/**
 * Type-only tests for Temperature unit types and converters.
 */
import { expectTypeOf, test } from 'vitest';
import type { Converter } from '../convert';
import {
  Celsius,
  celsiusToFahrenheit,
  Fahrenheit,
  fahrenheitToCelsius,
} from './temperature';

// =============================================================================
// Temperature Unit Tests
// =============================================================================

test('Temperature types should be properly defined', () => {
  expectTypeOf<Celsius>().toExtend<number>();
  expectTypeOf<Fahrenheit>().toExtend<number>();
});

test('Temperature constructors should return correct types', () => {
  const c: Celsius = 100;
  const f: Fahrenheit = 212;

  expectTypeOf(c).toEqualTypeOf<Celsius>();
  expectTypeOf(f).toEqualTypeOf<Fahrenheit>();
});

test('Temperature converters should be type-safe', () => {
  expectTypeOf(celsiusToFahrenheit).toEqualTypeOf<
    Converter<Celsius, Fahrenheit>
  >();
  expectTypeOf(fahrenheitToCelsius).toEqualTypeOf<
    Converter<Fahrenheit, Celsius>
  >();
});

test('Different temperature unit types should not be assignable to each other', () => {
  const c: Celsius = 100;
  const f: Fahrenheit = 212;

  expectTypeOf(c).not.toEqualTypeOf<Fahrenheit>();
  expectTypeOf(f).not.toEqualTypeOf<Celsius>();

  // But both extend number
  expectTypeOf(c).toExtend<number>();
  expectTypeOf(f).toExtend<number>();
});
