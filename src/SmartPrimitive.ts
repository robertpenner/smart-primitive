/**
 * 🔧 CONFIGURATION: Toggle smart primitive type checking
 *
 * When `usePlainPrimitives` is false (default): SmartPrimitive types provide type safety
 * When `usePlainPrimitives` is true: All SmartNumber, SmartString, etc. become plain primitives
 *
 * Use cases:
 * - Performance testing (eliminate type overhead)
 * - Debugging type issues
 * - Gradual migration to/from smart primitives
 * - Bundle size optimization
 *
 * How to configure (module augmentation):
 * ```ts
 * // In a .d.ts file in your project (e.g., smart-primitive.d.ts):
 * declare module '@penner/smart-primitive' {
 *   interface SmartPrimitiveConfig {
 *     usePlainPrimitives: true;
 *   }
 * }
 * ```
 *
 * This uses TypeScript's declaration merging so consumers can override the
 * default without modifying the library source.
 */

/**
 * Configuration interface for SmartPrimitive behavior.
 * Empty by default — consumers augment this to add properties.
 *
 * To disable branded types, augment with `usePlainPrimitives: true`.
 * The interface is intentionally empty so that declaration merging
 * can add the property (TypeScript doesn't allow changing a property's type).
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SmartPrimitiveConfig {}

/**
 * Resolves to `true` when SmartPrimitiveConfig has been augmented with
 * `usePlainPrimitives: true`, otherwise defaults to `false`.
 */
export type UsePlainPrimitives = SmartPrimitiveConfig extends {
  usePlainPrimitives: infer V;
}
  ? V
  : false;

// This interface produces cleaner tooltips on SmartPrimitive types
interface Brand<BrandName extends string> {
  readonly _brand?: BrandName;
}

/**
 * Generic smart primitive type that provides **opt-in type safety** while staying flexible.
 *
 * **How it works:**
 * - ✅ **Accepts plain values**: You can use regular numbers, strings, etc. directly
 * - ✅ **Prevents cross-domain mixing**: TypeScript stops you from using pixels where milliseconds are expected
 * - ✅ **Zero runtime cost**: No performance impact - it's just TypeScript magic
 * - ✅ **Easy to disable**: Augment `SmartPrimitiveConfig` to turn off all smart typing
 *
 * **Example:**
 * ```ts
 * type Pixels = SmartPrimitive<number, 'Pixels'>;
 * type Milliseconds = SmartPrimitive<number, 'Milliseconds'>;
 *
 * let width: Pixels = 300;        // ✅ Plain number works
 * let delay: Milliseconds = 500;        // ✅ Plain number works
 * let oops: Pixels = delay;       // ❌ TypeScript error - caught the mistake!
 * ```
 *
 * This prevents bugs like accidentally using milliseconds where pixels are expected,
 * while keeping your code simple and readable.
 */
export type SmartPrimitive<
  Base extends string | number | boolean | bigint | symbol,
  BrandName extends string,
> = UsePlainPrimitives extends true ? Base : Base & Brand<BrandName>;

/**
 * A smart number type for domain-specific numeric values like pixels, milliseconds, etc.
 *
 * **Why use this?** Prevents common bugs like mixing up different kinds of numbers:
 * - Using milliseconds where pixels are expected
 * - Passing a width value to a duration parameter
 * - Confusing degrees with radians
 *
 * **How it works:**
 * - ✅ Works with plain numbers: `let width: Pixels = 300`
 * - ✅ Catches domain mix-ups: `let width: Pixels = duration` → TypeScript error
 * - ✅ Zero runtime cost: Just TypeScript checking, no JavaScript overhead
 *
 * Built on `SmartPrimitive` - respects `SmartPrimitiveConfig` for easy toggling.
 *
 * **Example:**
 * ```ts
 * type Pixels = SmartNumber<'Pixels'>;
 * type Milliseconds = SmartNumber<'Milliseconds'>;
 *
 * let width: Pixels = 300;        // ✅ works
 * let delay: Milliseconds = 500;        // ✅ works
 * let badAssign: Pixels = delay;  // ❌ type error - caught the mistake!
 * ```
 *
 * When `usePlainPrimitives` is false (default):
 * - Full smart number system with type safety between different units
 * - Plain numbers accepted seamlessly
 * - Clean tooltip display
 *
 * When `usePlainPrimitives` is true:
 * - All smart number types collapse to plain `number`
 * - Zero runtime overhead, maximum performance
 *
 * Usage remains the same regardless of config:
 * ```ts
 * let distance: Pixels = 300;           // ✅ always works
 * let branded: Pixels = 300 as Pixels;  // ✅ always works
 * ```
 */
export type SmartNumber<BrandName extends string> = SmartPrimitive<
  number,
  BrandName
>;

/**
 * A smart string type that accepts plain strings but maintains type identity.
 * Perfect for things like URLs, CSS selectors, or other domain-specific strings.
 *
 * Usage:
 * ```ts
 * type URL = SmartString<'URL'>;
 * type CSSSelector = SmartString<'CSSSelector'>;
 *
 * let url: URL = "https://example.com";        // ✅ works
 * let selector: CSSSelector = ".my-class";     // ✅ works
 * let badAssign: URL = selector;               // ❌ type error
 * ```
 */
export type SmartString<BrandName extends string> = SmartPrimitive<
  string,
  BrandName
>;

/**
 * A smart boolean type that accepts plain booleans but maintains type identity.
 * Useful for domain-specific flags or state indicators.
 *
 * Usage:
 * ```ts
 * type IsVisible = SmartBoolean<'IsVisible'>;
 * type IsEnabled = SmartBoolean<'IsEnabled'>;
 *
 * let visible: IsVisible = true;               // ✅ works
 * let enabled: IsEnabled = false;              // ✅ works
 * let badAssign: IsVisible = enabled;          // ❌ type error
 * ```
 */
export type SmartBoolean<BrandName extends string> = SmartPrimitive<
  boolean,
  BrandName
>;
/**
 * A smart bigint type that accepts plain `bigint` values but maintains
 * a distinct branded identity.
 *
 * Useful for domain-specific big integers such as IDs or counters where
 * accidental mixing with other numeric types should be prevented.
 *
 * Usage:
 * ```ts
 * type EntityId = SmartBigInt<'EntityId'>;
 * type UserId = SmartBigInt<'UserId'>;
 * let id: EntityId = 123n;               // ✅ works
 * let user: UserId = 456n;               // ✅ works
 * let badAssign: EntityId = user;        // ❌ type error
 * ```
 */
export type SmartBigInt<BrandName extends string> = SmartPrimitive<
  bigint,
  BrandName
>;

/**
 * A smart symbol type that accepts plain `symbol` values but maintains
 * a distinct branded identity.
 *
 * Useful for domain-specific symbol tokens (e.g. event types, internal
 * keys) where mixing distinct tokens should be prevented by the type system.
 *
 * Usage:
 * ```ts
 * type EventType = SmartSymbol<'EventType'>;
 * type Token = SmartSymbol<'Token'>;
 * let e: EventType = Symbol('click');    // ✅ works
 * let t: Token = Symbol('auth');         // ✅ works
 * let badAssign: EventType = t;          // ❌ type error
 * ```
 */
export type SmartSymbol<BrandName extends string> = SmartPrimitive<
  symbol,
  BrandName
>;

/**
 * Simplified Unbrand using the generic brand pattern.
 * Also respects the `SmartPrimitiveConfig` toggle.
 *
 * When `usePlainPrimitives` is true: This becomes a no-op (types pass through unchanged)
 * When `usePlainPrimitives` is false (default): Full unbranding to base types
 */
export type Unbrand<T> = UsePlainPrimitives extends true
  ? T // 🚫 Smart types disabled: types pass through unchanged
  : // 🎯 Smart types enabled: extract base types and recurse
    // 1️⃣ If T has a brand, extract the base type (could be number, string, etc.)
    T extends number & { readonly _brand?: unknown }
    ? number
    : T extends string & { readonly _brand?: unknown }
      ? string
      : T extends boolean & { readonly _brand?: unknown }
        ? boolean
        : T extends bigint & { readonly _brand?: unknown }
          ? bigint
          : T extends symbol & { readonly _brand?: unknown }
            ? symbol
            : // 2️⃣ If T is an object (e.g. your params bag), recurse each field
              T extends Record<string, unknown>
              ? { [K in keyof T]: Unbrand<T[K]> }
              : // 3️⃣ Everything else stays the same
                T;

/**
 * Given any function type F, produce a new function type whose
 * arguments have been passed through Unbrand<…>, and whose return
 * type you can also choose to unbrand (or leave alone).
 */
export type UnbrandFn<F, UnbrandReturn extends boolean = false> = F extends (
  ...args: infer A
) => infer R
  ? A extends readonly unknown[]
    ? (
        ...args: { [K in keyof A]: Unbrand<A[K]> }
      ) => UnbrandReturn extends true ? Unbrand<R> : R
    : never
  : never;

// Note: BaseOf was removed - it only worked with SmartPrimitive _brand types,
// not with trait-based types (_unit, _kind, etc.) which are the primary system now.
