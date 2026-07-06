/**
 * Demo: Plain primitives mode (usePlainPrimitives: true)
 *
 * With the module augmentation in smart-primitive.d.ts, all SmartPrimitive
 * types collapse to their base primitives. Cross-brand assignments compile
 * without error because there are no brands to distinguish.
 *
 * Run: npx tsc --noEmit
 */

import type {
  SmartNumber,
  SmartString,
  Unbrand,
  UsePlainPrimitives,
} from '@penner/smart-primitive';

// ─── Verify the config override is active ───────────────────────────────────

// With the .d.ts augmentation, this resolves to `true`
type ConfigCheck = UsePlainPrimitives; // true

// ─── Define domain types ────────────────────────────────────────────────────

type Pixels = SmartNumber<'Pixels'>;
type Milliseconds = SmartNumber<'Milliseconds'>;
type URL = SmartString<'URL'>;

// ─── Cross-brand assignment: allowed in plain mode ──────────────────────────

const delay: Milliseconds = 500;

// This compiles because Pixels and Milliseconds are both just `number`
const crossAssign: Pixels = delay; // no error in plain mode

// SmartString types are just `string`
const selector: URL = 'https://example.com';

// ─── Unbrand is a no-op ────────────────────────────────────────────────────

type UnbrandedPixels = Unbrand<Pixels>; // just `number`
type UnbrandedURL = Unbrand<URL>; // just `string`

// ─── Runtime code is identical regardless of mode ───────────────────────────

function moveElement(distance: Pixels, duration: Milliseconds): string {
  return `Moving ${distance}px over ${duration}ms`;
}

console.log(moveElement(crossAssign, delay));
console.log(`URL: ${selector}`);
