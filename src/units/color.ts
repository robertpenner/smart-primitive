/**
 * 🎨 Color Units
 *
 * Trait-based types for color channel values with type-safe representations.
 */

import type { WithClamped, WithKind, WithRange } from '../trait-utils';

/* ═══════════════════════════════════════════════════════════════
   COLOR CHANNEL PRIMITIVES (perceptual / linear-light spaces)
   ═══════════════════════════════════════════════════════════════ */

/**
 * Linear-light sRGB channel value, [0, 1].
 *
 * Distinct from `Normalized` so the type system doesn't let you confuse a
 * gamma-encoded sRGB byte (after normalising to 0-1) with a linear-light
 * value: they look the same at the bit level but pixel-shading math
 * requires the linear form.
 */
export type LinearChannel = WithRange<0, 1> &
  WithClamped &
  WithKind<'linear-channel'>;

/**
 * OKLab opponent-color axis (`a` = green↔red, `b` = blue↔yellow).
 *
 * Signed; in-gamut sRGB inputs land roughly in [-0.4, +0.4]. Conservative
 * range declared without `WithClamped` because lerp endpoints stay in-range
 * but interior values are not clamped during interpolation.
 */
export type OKLabAxis = WithRange<-0.5, 0.5> & WithKind<'oklab-axis'>;

/**
 * OKLCH chroma (saturation magnitude in OKLab). Non-negative; in-gamut sRGB
 * tops out near ~0.4. Not clamped — interior lerp values may exceed 0.4 if
 * inputs do, and the renderer clips at the byte conversion step.
 */
export type OKLabChroma = WithRange<0, 0.5> & WithKind<'oklab-chroma'>;

/* ═══════════════════════════════════════════════════════════════
   COLOR TYPES
   ═══════════════════════════════════════════════════════════════ */

/**
 * A color channel value in the range [0, 255].
 * Used for RGB and alpha channels in byte-based color representations
 * (Canvas ImageData, PNG/JPEG files, etc.).
 */
export type ColorByte = WithRange<0, 255> &
  WithClamped &
  WithKind<'color-byte'>;

/**
 * RGB color tuple with named elements.
 * Each component is a byte value [0, 255].
 *
 * @example
 * ```ts
 * const red: RGBTuple = [255, 0, 0];
 * const [r, g, b] = red;
 * ```
 */
export type RGBTuple = [r: ColorByte, g: ColorByte, b: ColorByte];

/**
 * RGBA color tuple with named elements.
 * Each component is a byte value [0, 255].
 *
 * @example
 * ```ts
 * const semiTransparentRed: RGBATuple = [255, 0, 0, 128];
 * const [r, g, b, a] = semiTransparentRed;
 * ```
 */
export type RGBATuple = [
  r: ColorByte,
  g: ColorByte,
  b: ColorByte,
  a: ColorByte,
];
