---
name: smart-primitive
description: >-
  Apply @penner/smart-primitive types to function parameters and config
  interfaces. Use when the user says "use smart-primitives", "type this
  with smart-primitive", "add SmartPrimitive types", or when reviewing
  config interfaces in packages that depend on @penner/smart-primitive.
---

# SmartPrimitive Usage

Apply `@penner/smart-primitive` types to annotate numeric parameters with
semantic meaning: what unit, what scale, what range.

## Decision Procedure

When typing a numeric parameter:

1. **Search for precedent** — look for how the same concept is typed elsewhere
   in the codebase. Consistency across modules trumps local correctness.
2. **Infer the scale** — read default values (`0.6` → 0–1; `60` → 0–100),
   JSDoc ("fraction (0–1)" vs "percent"), parameter names (`decay`, `ratio`
   → normalized; `pct` → percentage), and how the value is consumed in code
   (`/ 100` → percentage input; `Math.min(1, …)` → 0–1 scale).
3. **Pick the base type** — find the right composed type in the package source
   (`NormalizedProgress`, `NormalizedVelocity`, `NormalizedTime`, `Degrees`,
   etc.). Read the unit files for the current inventory.
4. **Add range traits if constrained** — compose with `&`:
   - `WithRangeAbove<Min>` for `[Min, ∞)`
   - `WithRangeBelow<Max>` for `(−∞, Max]`
   - `WithRange<Min, Max>` for closed `[Min, Max]`
   - `WithClamped` if the implementation clamps out-of-range values
5. **Apply at all function boundaries** — config interfaces, public APIs,
   and internal helper functions all benefit from semantic typing. The
   annotation documents what the value _means_ regardless of validation.

## Anti-Patterns

- **Never union with `number`** — SmartPrimitives already accept unbranded
  primitive values by design. `decay: NormalizedProgress` is correct;
  `decay: NormalizedProgress | number` is redundant.
- **Never cast literals** — a plain number is directly assignable to any
  SmartPrimitive. `const angle: Degrees = 45` is correct;
  `const angle = 45 as Degrees` is unnecessary.
- **Don't fake missing bounds** — use `WithRangeAbove` / `WithRangeBelow`
  for half-open ranges. Don't use `WithRange` with a sentinel like `1e300`
  for the missing bound.
- **Don't guess the scale** — `PercentProgress` is 0–100;
  `NormalizedProgress` is 0–1. Infer from context before choosing.
- **Don't duplicate shared types** — if a type is used across multiple
  modules, define it in a shared location and re-export for backward
  compatibility.
