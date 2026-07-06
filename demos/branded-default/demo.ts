/**
 * Demo: Branded types mode (default — usePlainPrimitives: false)
 *
 * No .d.ts override here, so SmartPrimitive types retain their brands.
 * Cross-brand assignments are caught as type errors.
 *
 * Run: npx tsc --noEmit
 *   Expected: TWO type errors on the lines marked @ts-expect-error
 */

import type {
  SmartNumber,
  SmartString,
  Unbrand,
  UsePlainPrimitives,
} from '@penner/smart-primitive';

// ─── Verify the default config is active ────────────────────────────────────

// Without augmentation, this resolves to `false`
type ConfigCheck = UsePlainPrimitives; // false

// ─── Define domain types ────────────────────────────────────────────────────

type Pixels = SmartNumber<'Pixels'>;
type Milliseconds = SmartNumber<'Milliseconds'>;
type URL = SmartString<'URL'>;

// ─── Plain values are assignable (as always) ────────────────────────────────

const width: Pixels = 300;
const delay: Milliseconds = 500;
const url: URL = 'https://example.com';

// ─── Cross-brand assignment: caught as a type error ─────────────────────────

// @ts-expect-error Milliseconds is not assignable to Pixels
const oops: Pixels = delay;

// @ts-expect-error SmartString<'URL'> is not assignable to SmartNumber<'Pixels'>
const wrongBase: Pixels = url;

// ─── Unbrand strips the brand ───────────────────────────────────────────────

type UnbrandedPixels = Unbrand<Pixels>; // number
type UnbrandedURL = Unbrand<URL>; // string

// ─── Runtime code works the same ────────────────────────────────────────────

function moveElement(distance: Pixels, duration: Milliseconds): string {
  return `Moving ${distance}px over ${duration}ms`;
}

console.log(moveElement(width, delay));
console.log(`URL: ${url}`);
