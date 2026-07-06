> Mirror of a package developed in a private monorepo — issues and pull requests are welcome here.

# @penner/smart-primitive

Type-safe primitives for TypeScript. Catch unit mix-ups at compile time with zero runtime cost.

## Installation

```bash
npm install @penner/smart-primitive
```

## Quick Start

Import ready-to-use types, annotate your variables and parameters, and let TypeScript catch mistakes:

```typescript
import { Pixels, Milliseconds, Degrees } from "@penner/smart-primitive";

function animate(
  element: HTMLElement,
  distance: Pixels,
  duration: Milliseconds,
  rotation: Degrees,
) {
  // ...
}

const dist: Pixels = 100;
const time: Milliseconds = 500;
const angle: Degrees = 90;

animate(el, dist, time, angle); // ✅ correct
animate(el, time, dist, angle); // ❌ Error! Can't use Milliseconds where Pixels expected
```

Plain values are always assignable — no casting or wrapping required:

```typescript
const width: Pixels = 300; // ✅ plain number works
const delay: Milliseconds = 1000; // ✅ plain number works
const opacity: Alpha = 0.8; // ✅ plain number works
```

### Available Unit Types

| Category    | Types                                                                                                                |
| ----------- | -------------------------------------------------------------------------------------------------------------------- |
| Time        | `Seconds`, `Milliseconds`, `Minutes`, `Hours`                                                                        |
| Length      | `Pixels`, `Ems`, `Rems`, `Vw`, `Vh`, `Percent`, `Points`, `Inches`, `Centimeters`, `Millimeters`, `Meters`           |
| Angle       | `Degrees`, `Radians`, `Turns`                                                                                        |
| Normalized  | `Normalized` (0–1), `SignedNormalized` (−1–1), `ClampedNormalized`, `Percentage` (0–100), `Alpha`, `Ratio`, `Factor` |
| Temperature | `Celsius`, `Fahrenheit`                                                                                              |
| Color       | `ColorByte` (0–255), `RGBTuple`, `RGBATuple`                                                                         |
| Integer     | `Index`                                                                                                              |
| Animation   | `NormalizedTime` (clamped 0–1), `NormalizedProgress` (can overshoot), `PercentProgress`                              |

All types are importable from the package root or from `@penner/smart-primitive/units`.

## The Trait System

These types are built from a small set of composable **traits** — phantom interfaces combined via TypeScript intersection (`&`).

### How Types Are Composed

A simple type like `Pixels` needs just a unit and kind:

```typescript
// Pixels = number with unit 'px' and kind 'length'
type Pixels = WithUnit<"px"> & WithKind<"length">;
```

A richer type layers on more traits:

```typescript
// Degrees = number with unit 'deg', range [0, 360), periodic wrapping, kind 'angle'
type Degrees = WithUnit<"deg"> & WithRange<0, 360> & WithPeriodic & WithKind<"angle">;
```

Some types only need a range:

```typescript
// Normalized = number in the range [0, 1], unclamped (can overshoot)
type Normalized = WithRange<0, 1>;

// ClampedNormalized = Normalized that's guaranteed within bounds
type ClampedNormalized = Normalized & WithClamped;
```

### Core Traits

| Trait                 | Purpose                                                                      |
| --------------------- | ---------------------------------------------------------------------------- |
| `WithUnit<U>`         | Labels the measurement unit (`'px'`, `'ms'`, `'deg'`, …)                     |
| `WithRange<Min, Max>` | Documents the reference range (informational)                                |
| `WithClamped`         | Marks the value as constrained to its range                                  |
| `WithPeriodic`        | Marks the value as wrapping at range boundaries                              |
| `WithKind<K>`         | Groups related types under an archetype (`'length'`, `'time'`, `'angle'`, …) |
| `WithInteger`         | Marks the value as a whole number                                            |

### Defining Custom Types

Compose traits to define your own domain types:

```typescript
import { WithUnit, WithRange, WithClamped, WithKind } from "@penner/smart-primitive";

// A simple branded unit
type Frames = WithUnit<"frames"> & WithKind<"time">;

// A bounded value
type Volume = WithRange<0, 100> & WithUnit<"percent"> & WithClamped;

// An unbounded measurement
type Force = WithUnit<"N"> & WithKind<"force">;
```

### Trait Extraction

Query type-level metadata from trait-based types:

```typescript
import type {
  UnitOf,
  RangeOf,
  MinOf,
  MaxOf,
  IsClamped,
  IsPeriodic,
  KindOf,
} from "@penner/smart-primitive";

type U = UnitOf<Degrees>; // 'deg'
type R = RangeOf<Degrees>; // readonly [0, 360]
type K = KindOf<Pixels>; // 'length'
type C = IsClamped<Alpha>; // false
type P = IsPeriodic<Degrees>; // true
```

### Trait Modification

Transform types by adding, removing, or changing traits:

```typescript
import type { WithoutClamped, ChangeUnits, ChangeRange } from "@penner/smart-primitive";

type Unclamped = WithoutClamped<ClampedNormalized>; // remove clamping
type InInches = ChangeUnits<Pixels, "in">; // swap units
type WiderRange = ChangeRange<Normalized, -1, 2>; // change range
```

### Runtime Utilities

The `clamp` and `wrap` functions operate on trait-based types and refine the output type accordingly:

```typescript
import { clamp, wrap } from "@penner/smart-primitive";

const v = clamp(1.5, 0, 1); // value: 1, type: WithRange<0, 1> & WithClamped
const w = wrap(450, 0, 360); // value: 90, type: WithRange<0, 360> & WithPeriodic
```

## Conversions

Each unit module ships pre-built converter functions:

```typescript
import { degreesToRadians, radiansToDegrees } from "@penner/smart-primitive";
import { secondsToMilliseconds, celsiusToFahrenheit } from "@penner/smart-primitive";
import { normalizedToPercentage, metersToCentimeters } from "@penner/smart-primitive";

const rad: Radians = degreesToRadians(90); // π/2
const ms: Milliseconds = secondsToMilliseconds(2); // 2000
const pct: Percentage = normalizedToPercentage(0.75); // 75
```

For custom conversions, use the factory functions:

```typescript
import { createConverter, createBiConverter, createLinearConverter } from "@penner/smart-primitive";

// One-way converter
const framesToSeconds = createConverter<Frames, Seconds>((f) => f / 60);

// Bidirectional converter
const pixelsRems = createBiConverter<Pixels, Rems>(
  (px) => px / 16,
  (rem) => rem * 16,
);
pixelsRems.to(32); // 2 Rems
pixelsRems.from(1.5); // 24 Pixels

// Linear ratio converter
const metersCm = createLinearConverter<Meters, Centimeters>(100);
```

Advanced patterns like `chain` (compose converters) and `ConverterRegistry` (runtime lookup) are also available.

## String Types

The library includes semantic string types via `@penner/smart-primitive/strings`, with template literal validation where possible:

```typescript
import type {
  CSSLength,
  CSSCustomProperty,
  UUID,
  EmailAddress,
} from "@penner/smart-primitive/strings";

const width: CSSLength = "16px"; // template: `${number}${CSSLengthUnit}`
const prop: CSSCustomProperty = "--main-color"; // template: `--${string}`
const id: UUID = "550e8400-e29b-41d4-a716-446655440000";
const email: EmailAddress = "user@example.com";
```

See the [strings module](./src/strings/) for the full list of CSS, web, and data format types.

## SmartPrimitive & SmartNumber

For quick, ad-hoc branded types that don't need trait composition, `SmartNumber` and `SmartString` are still available:

```typescript
import { SmartNumber, SmartString } from "@penner/smart-primitive";

type Score = SmartNumber<"Score">;
type SessionToken = SmartString<"SessionToken">;

const points: Score = 42;
const token: SessionToken = "abc123";
```

> **Note:** All pre-built unit types (`Pixels`, `Degrees`, `Milliseconds`, etc.) are now defined using the trait system rather than `SmartNumber`. Trait-based types carry richer metadata (units, ranges, kinds) and support extraction utilities like `UnitOf` and `RangeOf`. For a discussion of the tradeoffs between the two approaches, see [SmartPrimitive vs Traits analysis](../../docs/research/smart-primitive-vs-traits.md).

## Feature Flag: Toggle Type Safety

Disable all smart typing across your project via module augmentation:

```typescript
// In a .d.ts file in your project (e.g., smart-primitive.d.ts):
declare module "@penner/smart-primitive" {
  interface SmartPrimitiveConfig {
    usePlainPrimitives: true;
  }
}
```

When enabled, all smart types collapse to plain primitives (`number`, `string`, etc.) and all cross-type assignments are allowed. Useful for debugging type issues or gradual migration.

> **Performance note:** benchmarking shows this flag has no measurable effect on typecheck speed — smart-primitive intersections are cheap to resolve. See [typecheck performance analysis](./docs/typecheck-performance.md).

## Utility Types

### `Unbrand<T>`

Strip branding from types, recursing into object structures:

```typescript
import type { Unbrand } from "@penner/smart-primitive";

type Config = { width: Pixels; duration: Milliseconds };
type Plain = Unbrand<Config>;
// { width: number; duration: number }
```

### `UnbrandFn<F>`

Strip branding from function parameter types:

```typescript
import type { UnbrandFn } from "@penner/smart-primitive";

declare function move(distance: Pixels, duration: Milliseconds): void;
type PlainMove = UnbrandFn<typeof move>;
// (distance: number, duration: number) => void
```

## TypeScript Compatibility

Requires TypeScript 4.5 or higher.

## AI Agent Skill

This package ships a [`SKILL.md`](./SKILL.md) file with guidance for AI coding
agents on how to apply SmartPrimitive types correctly — choosing the right base
type, composing traits, and avoiding common mistakes.

To use it with an agent that supports skills (e.g., Claude):

```bash
# Copy to your project's skills directory
cp node_modules/@penner/smart-primitive/SKILL.md .claude/skills/smart-primitive/SKILL.md
```

Then invoke with `/smart-primitive` or by asking the agent to
"use smart-primitives" on a file or interface.

The skill is also useful as a human-readable style guide for applying
SmartPrimitive types consistently across a codebase.

## License

MIT
