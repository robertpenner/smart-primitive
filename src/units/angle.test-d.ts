/**
 * Type-only tests for Angle unit types and converters.
 */
import { describe, expect, expectTypeOf, test } from 'vitest';
import type { Converter } from '../convert';
import {
  Degrees,
  degreesToRadians,
  degreesToTurns,
  normalizeDegrees,
  normalizeRadians,
  normalizeTurns,
  Radians,
  radiansToDegrees,
  radiansToTurns,
  Turns,
  turnsToDegrees,
  turnsToRadians,
} from './angle';

// =============================================================================
// Angle Unit Tests
// =============================================================================

test('Angle types should be properly defined', () => {
  expectTypeOf<Degrees>().toExtend<number>();
  expectTypeOf<Radians>().toExtend<number>();
  expectTypeOf<Turns>().toExtend<number>();
});

test('Angle constructors should return correct types', () => {
  const deg: Degrees = 90;
  const rad: Radians = Math.PI;
  const t: Turns = 0.25;

  expectTypeOf(deg).toEqualTypeOf<Degrees>();
  expectTypeOf(rad).toEqualTypeOf<Radians>();
  expectTypeOf(t).toEqualTypeOf<Turns>();
});

test('Angle converters should be type-safe', () => {
  expectTypeOf(degreesToRadians).toEqualTypeOf<Converter<Degrees, Radians>>();
  expectTypeOf(radiansToDegrees).toEqualTypeOf<Converter<Radians, Degrees>>();
});

test('Angle utilities should preserve types', () => {
  const deg: Degrees = 450;
  const normalized = normalizeDegrees(deg);
  expectTypeOf(normalized).toEqualTypeOf<Degrees>();
});

test('Different angle unit types should not be assignable to each other', () => {
  const deg: Degrees = 90;
  const rad: Radians = Math.PI;
  const t: Turns = 0.25;

  expectTypeOf(deg).not.toEqualTypeOf<Radians>();
  expectTypeOf(rad).not.toEqualTypeOf<Turns>();
  expectTypeOf(t).not.toEqualTypeOf<Degrees>();

  // But all extend number
  expectTypeOf(deg).toExtend<number>();
  expectTypeOf(rad).toExtend<number>();
  expectTypeOf(t).toExtend<number>();
});

// =============================================================================
// Angle Conversion Function Tests (Runtime)
// =============================================================================

describe('degreesToRadians', () => {
  test('should convert 0 degrees to 0 radians', () => {
    expect(degreesToRadians(0 as Degrees)).toBe(0);
  });

  test('should convert 180 degrees to π radians', () => {
    expect(degreesToRadians(180 as Degrees)).toBeCloseTo(Math.PI);
  });

  test('should convert 360 degrees to 2π radians', () => {
    expect(degreesToRadians(360 as Degrees)).toBeCloseTo(2 * Math.PI);
  });

  test('should convert 90 degrees to π/2 radians', () => {
    expect(degreesToRadians(90 as Degrees)).toBeCloseTo(Math.PI / 2);
  });

  test('should convert 45 degrees to π/4 radians', () => {
    expect(degreesToRadians(45 as Degrees)).toBeCloseTo(Math.PI / 4);
  });

  test('should convert negative degrees correctly', () => {
    expect(degreesToRadians(-90 as Degrees)).toBeCloseTo(-Math.PI / 2);
  });
});

describe('radiansToDegrees', () => {
  test('should convert 0 radians to 0 degrees', () => {
    expect(radiansToDegrees(0 as Radians)).toBe(0);
  });

  test('should convert π radians to 180 degrees', () => {
    expect(radiansToDegrees(Math.PI as Radians)).toBeCloseTo(180);
  });

  test('should convert 2π radians to 360 degrees', () => {
    expect(radiansToDegrees((2 * Math.PI) as Radians)).toBeCloseTo(360);
  });

  test('should convert π/2 radians to 90 degrees', () => {
    expect(radiansToDegrees((Math.PI / 2) as Radians)).toBeCloseTo(90);
  });

  test('should convert π/4 radians to 45 degrees', () => {
    expect(radiansToDegrees((Math.PI / 4) as Radians)).toBeCloseTo(45);
  });

  test('should convert negative radians correctly', () => {
    expect(radiansToDegrees((-Math.PI / 2) as Radians)).toBeCloseTo(-90);
  });
});

describe('degreesToTurns', () => {
  test('should convert 0 degrees to 0 turns', () => {
    expect(degreesToTurns(0 as Degrees)).toBe(0);
  });

  test('should convert 360 degrees to 1 turn', () => {
    expect(degreesToTurns(360 as Degrees)).toBe(1);
  });

  test('should convert 180 degrees to 0.5 turns', () => {
    expect(degreesToTurns(180 as Degrees)).toBe(0.5);
  });

  test('should convert 90 degrees to 0.25 turns', () => {
    expect(degreesToTurns(90 as Degrees)).toBe(0.25);
  });

  test('should convert 45 degrees to 0.125 turns', () => {
    expect(degreesToTurns(45 as Degrees)).toBe(0.125);
  });

  test('should convert negative degrees correctly', () => {
    expect(degreesToTurns(-180 as Degrees)).toBe(-0.5);
  });
});

describe('turnsToDegrees', () => {
  test('should convert 0 turns to 0 degrees', () => {
    expect(turnsToDegrees(0 as Turns)).toBe(0);
  });

  test('should convert 1 turn to 360 degrees', () => {
    expect(turnsToDegrees(1 as Turns)).toBe(360);
  });

  test('should convert 0.5 turns to 180 degrees', () => {
    expect(turnsToDegrees(0.5 as Turns)).toBe(180);
  });

  test('should convert 0.25 turns to 90 degrees', () => {
    expect(turnsToDegrees(0.25 as Turns)).toBe(90);
  });

  test('should convert 0.125 turns to 45 degrees', () => {
    expect(turnsToDegrees(0.125 as Turns)).toBe(45);
  });

  test('should convert negative turns correctly', () => {
    expect(turnsToDegrees(-0.5 as Turns)).toBe(-180);
  });
});

describe('radiansToTurns', () => {
  test('should convert 0 radians to 0 turns', () => {
    expect(radiansToTurns(0 as Radians)).toBe(0);
  });

  test('should convert 2π radians to 1 turn', () => {
    expect(radiansToTurns((2 * Math.PI) as Radians)).toBeCloseTo(1);
  });

  test('should convert π radians to 0.5 turns', () => {
    expect(radiansToTurns(Math.PI as Radians)).toBeCloseTo(0.5);
  });

  test('should convert π/2 radians to 0.25 turns', () => {
    expect(radiansToTurns((Math.PI / 2) as Radians)).toBeCloseTo(0.25);
  });

  test('should convert π/4 radians to 0.125 turns', () => {
    expect(radiansToTurns((Math.PI / 4) as Radians)).toBeCloseTo(0.125);
  });

  test('should convert negative radians correctly', () => {
    expect(radiansToTurns(-Math.PI as Radians)).toBeCloseTo(-0.5);
  });
});

describe('turnsToRadians', () => {
  test('should convert 0 turns to 0 radians', () => {
    expect(turnsToRadians(0 as Turns)).toBe(0);
  });

  test('should convert 1 turn to 2π radians', () => {
    expect(turnsToRadians(1 as Turns)).toBeCloseTo(2 * Math.PI);
  });

  test('should convert 0.5 turns to π radians', () => {
    expect(turnsToRadians(0.5 as Turns)).toBeCloseTo(Math.PI);
  });

  test('should convert 0.25 turns to π/2 radians', () => {
    expect(turnsToRadians(0.25 as Turns)).toBeCloseTo(Math.PI / 2);
  });

  test('should convert 0.125 turns to π/4 radians', () => {
    expect(turnsToRadians(0.125 as Turns)).toBeCloseTo(Math.PI / 4);
  });

  test('should convert negative turns correctly', () => {
    expect(turnsToRadians(-0.5 as Turns)).toBeCloseTo(-Math.PI);
  });
});

describe('normalizeDegrees', () => {
  test('should return 0 for 0 degrees', () => {
    expect(normalizeDegrees(0 as Degrees)).toBe(0);
  });

  test('should return angle unchanged if in range [0, 360)', () => {
    expect(normalizeDegrees(90 as Degrees)).toBe(90);
    expect(normalizeDegrees(180 as Degrees)).toBe(180);
    expect(normalizeDegrees(359 as Degrees)).toBe(359);
  });

  test('should wrap 360 to 0', () => {
    expect(normalizeDegrees(360 as Degrees)).toBe(0);
  });

  test('should wrap 720 to 0', () => {
    expect(normalizeDegrees(720 as Degrees)).toBe(0);
  });

  test('should wrap 450 to 90', () => {
    expect(normalizeDegrees(450 as Degrees)).toBe(90);
  });

  test('should convert negative angles to positive range', () => {
    expect(normalizeDegrees(-90 as Degrees)).toBe(270);
    expect(normalizeDegrees(-180 as Degrees)).toBe(180);
    expect(normalizeDegrees(-360 as Degrees)).toBe(0);
  });

  test('should handle large negative angles', () => {
    expect(normalizeDegrees(-450 as Degrees)).toBe(270);
  });
});

describe('normalizeRadians', () => {
  test('should return 0 for 0 radians', () => {
    expect(normalizeRadians(0 as Radians)).toBe(0);
  });

  test('should return angle unchanged if in range [0, 2π)', () => {
    expect(normalizeRadians((Math.PI / 2) as Radians)).toBeCloseTo(Math.PI / 2);
    expect(normalizeRadians(Math.PI as Radians)).toBeCloseTo(Math.PI);
  });

  test('should wrap 2π to 0', () => {
    expect(normalizeRadians((2 * Math.PI) as Radians)).toBeCloseTo(0);
  });

  test('should wrap 4π to 0', () => {
    expect(normalizeRadians((4 * Math.PI) as Radians)).toBeCloseTo(0);
  });

  test('should wrap 3π to π', () => {
    expect(normalizeRadians((3 * Math.PI) as Radians)).toBeCloseTo(Math.PI);
  });

  test('should convert negative angles to positive range', () => {
    expect(normalizeRadians((-Math.PI / 2) as Radians)).toBeCloseTo(
      (3 * Math.PI) / 2,
    );
    expect(normalizeRadians(-Math.PI as Radians)).toBeCloseTo(Math.PI);
    expect(normalizeRadians((-2 * Math.PI) as Radians)).toBeCloseTo(0);
  });

  test('should handle large negative angles', () => {
    expect(normalizeRadians((-3 * Math.PI) as Radians)).toBeCloseTo(Math.PI);
  });
});

describe('normalizeTurns', () => {
  test('should return 0 for 0 turns', () => {
    expect(normalizeTurns(0 as Turns)).toBe(0);
  });

  test('should return angle unchanged if in range [0, 1)', () => {
    expect(normalizeTurns(0.25 as Turns)).toBe(0.25);
    expect(normalizeTurns(0.5 as Turns)).toBe(0.5);
    expect(normalizeTurns(0.999 as Turns)).toBeCloseTo(0.999);
  });

  test('should wrap 1 to 0', () => {
    expect(normalizeTurns(1 as Turns)).toBe(0);
  });

  test('should wrap 2 to 0', () => {
    expect(normalizeTurns(2 as Turns)).toBe(0);
  });

  test('should wrap 1.5 to 0.5', () => {
    expect(normalizeTurns(1.5 as Turns)).toBe(0.5);
  });

  test('should convert negative angles to positive range', () => {
    expect(normalizeTurns(-0.25 as Turns)).toBe(0.75);
    expect(normalizeTurns(-0.5 as Turns)).toBe(0.5);
    expect(normalizeTurns(-1 as Turns)).toBe(0);
  });

  test('should handle large negative angles', () => {
    expect(normalizeTurns(-1.5 as Turns)).toBe(0.5);
  });
});

// =============================================================================
// Conversion Chain Tests
// =============================================================================

describe('Conversion chains', () => {
  test('should round-trip degrees -> radians -> degrees', () => {
    const original = 45 as Degrees;
    const toRad = degreesToRadians(original);
    const backToDeg = radiansToDegrees(toRad);
    expect(backToDeg).toBeCloseTo(45);
  });

  test('should round-trip degrees -> turns -> degrees', () => {
    const original = 90 as Degrees;
    const toTurns = degreesToTurns(original);
    const backToDeg = turnsToDegrees(toTurns);
    expect(backToDeg).toBe(90);
  });

  test('should round-trip radians -> turns -> radians', () => {
    const original = Math.PI as Radians;
    const toTurns = radiansToTurns(original);
    const backToRad = turnsToRadians(toTurns);
    expect(backToRad).toBeCloseTo(Math.PI);
  });

  test('should chain degrees -> radians -> turns', () => {
    const deg = 90 as Degrees;
    const rad = degreesToRadians(deg);
    const turns = radiansToTurns(rad);
    expect(turns).toBeCloseTo(0.25);
  });

  test('should chain turns -> degrees -> radians', () => {
    const turns = 0.5 as Turns;
    const deg = turnsToDegrees(turns);
    const rad = degreesToRadians(deg);
    expect(rad).toBeCloseTo(Math.PI);
  });
});
