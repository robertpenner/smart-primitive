/**
 * Integer & Index Types
 *
 * Trait-based types for integer values and zero-based indices.
 */

import type { WithInteger, WithKind } from '../trait-utils';

/**
 * A non-negative integer used as a zero-based index into a collection.
 *
 * @example
 * ```ts
 * const extremumIndex: Index = 0;
 * const items = extrema[extremumIndex];
 * ```
 */
export type Index = WithInteger & WithKind<'index'>;
