# SmartPrimitiveConfig Demos

Two self-contained mini-projects demonstrating the `SmartPrimitiveConfig` toggle.

## `branded-default/`

Default behavior — SmartPrimitive types are branded. Cross-brand assignments are
type errors. Run `npx tsc --noEmit` and see that `@ts-expect-error` lines are
correctly expected.

## `plain-primitives/`

Consumer opts in to plain primitives via a `smart-primitive.d.ts` module
augmentation. All smart types collapse to `number`, `string`, etc. Cross-brand
assignments compile without error.

## How to verify

```bash
# From the smart-primitive package root:
npx tsc -p demos/branded-default/tsconfig.json
npx tsc -p demos/plain-primitives/tsconfig.json
```

Both should compile with zero errors.
