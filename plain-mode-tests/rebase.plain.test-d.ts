/**
 * Verifies `NumberString<T>` collapses to plain `string` under
 * `UsePlainPrimitives: true`. Lives in its own folder + tsconfig so the
 * augment does not leak into the main package compilation.
 *
 * No runtime values produced; this file is intentionally type-only.
 */

import { expectTypeOf, test } from 'vitest';

test('NumberString collapse under UsePlainPrimitives — type-level only', () => {});

import type { NumberString, WithEncoded } from '../src/rebase';
import type { Pixels } from '../src/units/length';

declare module '../src/SmartPrimitive' {
  interface SmartPrimitiveConfig {
    usePlainPrimitives: true;
  }
}

// In plain-primitive mode, WithEncoded collapses to {} and NumberString<X>
// becomes equal to plain `string`.
expectTypeOf<WithEncoded<number>>().toEqualTypeOf<{}>();
expectTypeOf<NumberString<Pixels>>().toEqualTypeOf<string>();
