/**
 * 🔁 Rebase + Encoded brand machinery
 *
 * Foundation for cross-base brand transport: strip one primitive base from a
 * SmartPrimitive type and reattach a different one, keeping all brand traits.
 *
 * See `docs/adr/0001-number-string-and-rebase.md`.
 */

import type { UsePlainPrimitives } from './SmartPrimitive';

/**
 * Allowed primitive bases for `WithEncoded`.
 */
export type Base = number | boolean | bigint | string | symbol;

interface Encoded<B extends Base> {
  readonly _encoded?: B;
}

/**
 * Marks a string-form (or other rebased) value as carrying an encoded
 * representation of base `B`. Collapses to `{}` under `UsePlainPrimitives`.
 */
// biome-ignore lint/complexity/noBannedTypes: {} intentionally means "no brand" in plain-primitive mode
export type WithEncoded<B extends Base> = UsePlainPrimitives extends true
  ? {}
  : Encoded<B>;

/**
 * Strip the keys of `OldBase` from `T` and reattach `NewBase`, preserving
 * all brand traits. Parameter order reads "rebase T from OldBase to NewBase".
 *
 * `Omit<T, keyof OldBase>` discards the intrinsic primitive keys (e.g.
 * `keyof number` covers `toFixed`/`toString`/`valueOf`), leaving only the
 * brand fields contributed by SmartPrimitive traits. Those brand fields are
 * then intersected with `NewBase`, yielding a value typed as `NewBase` but
 * carrying every trait the original had.
 *
 * @example
 * ```ts
 * type CSSPx = Rebase<Pixels, number, string>;
 * ```
 */
export type Rebase<T, OldBase, NewBase> = NewBase & Omit<T, keyof OldBase>;

/**
 * The string form of a number-based SmartPrimitive, preserving its brand
 * traits and additionally carrying a `WithEncoded<number>` brand.
 *
 * @example
 * ```ts
 * const halo: NumberString<Alpha> = '0.7';  // OK
 * const bad: NumberString<Alpha> = 0.7;     // ❌ type error
 * ```
 */
export type NumberString<T> = Rebase<T, number, string> & WithEncoded<number>;
