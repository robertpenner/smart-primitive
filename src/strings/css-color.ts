import type { PercentString } from './css';

// Note: TypeScript template literal types only accept plain primitive types
// (number, string, …) in interpolation positions — SmartPrimitive intersection
// types like `number & {_range?: …}` (WithRange, WithRangeAbove, etc.) are not
// matchable against string literals there. Range constraints are therefore
// documented via JSDoc on the named channel aliases below.

/**
 * The `none` keyword (CSS Color 4) indicates a missing channel value.
 * Treated as `0` for interpolation; distinct from `0` for gamut mapping.
 * Valid in all Color 4 functions (hwb, lab, lch, oklab, oklch, color()) and
 * modern space-separated rgb/hsl syntax. Not valid in legacy comma syntax
 * (rgba(), hsla() with commas).
 */
type CSSNone = 'none';

/** Hex color: `#rgb`, `#rrggbb`, `#rrggbbaa`. Wide by necessity — hex digit count can't be modeled precisely without a combinatorial union. */
type HexColor = `#${string}`;

type RGBString =
  | `rgb(${number}, ${number}, ${number})`
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | `rgb(${number | CSSNone} ${number | CSSNone} ${number | CSSNone})`
  | `rgb(${number | CSSNone} ${number | CSSNone} ${number | CSSNone} / ${number | CSSNone})`;

type HSLString =
  | `hsl(${number}, ${PercentString}, ${PercentString})`
  | `hsla(${number}, ${PercentString}, ${PercentString}, ${number})`
  | `hsl(${number | CSSNone} ${PercentString | CSSNone} ${PercentString | CSSNone})`
  | `hsl(${number | CSSNone} ${PercentString | CSSNone} ${PercentString | CSSNone} / ${number | CSSNone})`;

// CSS Color 4 only — no legacy comma syntax

// HWB: hue is an unbounded angle (wraps at 360); whiteness and blackness are always percentages.
type HWBString =
  | `hwb(${number | CSSNone} ${PercentString | CSSNone} ${PercentString | CSSNone})`
  | `hwb(${number | CSSNone} ${PercentString | CSSNone} ${PercentString | CSSNone} / ${number | CSSNone})`;

/** CIE Lab L (lightness): [0, 100] as number, or [0%, 100%] as percentage, or `none`. */
type LabL = number | PercentString | CSSNone;
/** CIE Lab a/b axes: theoretically unbounded (≈ ±125 in practice), number, percentage, or `none`. */
type LabAB = number | PercentString | CSSNone;

type LabString =
  | `lab(${LabL} ${LabAB} ${LabAB})`
  | `lab(${LabL} ${LabAB} ${LabAB} / ${number | CSSNone})`;

/** CIE LCH C (chroma): number ∈ [0, ∞), percentage [0%, 100%], or `none`. */
type LCHC = number | PercentString | CSSNone;

// LCH L is the same channel as Lab L: [0, 100] as number, or [0%, 100%] as percentage, or `none`.
type LCHString =
  | `lch(${LabL} ${LCHC} ${number | CSSNone})`
  | `lch(${LabL} ${LCHC} ${number | CSSNone} / ${number | CSSNone})`;

/** OKLab L (lightness): number ∈ [0, 1], percentage [0%, 100%], or `none`. */
type OKLabL = number | PercentString | CSSNone;
/** OKLab a/b axes: number ∈ [-0.4, 0.4] (theoretically unbounded, ±0.5 in practice), percentage [-100%, 100%], or `none`. */
type OKLabAB = number | PercentString | CSSNone;

type OKLabString =
  | `oklab(${OKLabL} ${OKLabAB} ${OKLabAB})`
  | `oklab(${OKLabL} ${OKLabAB} ${OKLabAB} / ${number})`;

/** OKLCH L (lightness): same channel as OKLab L — number ∈ [0, 1], percentage [0%, 100%], or `none`. */
type OKLCHL = OKLabL;
/** OKLCH C (chroma): number ∈ [0, ∞) (typically 0–0.4), percentage [0%, 100%], or `none`. */
type OKLCHC = number | PercentString | CSSNone;

type OKLCHString =
  | `oklch(${OKLCHL} ${OKLCHC} ${number | CSSNone})`
  | `oklch(${OKLCHL} ${OKLCHC} ${number | CSSNone} / ${number | CSSNone})`;

type ColorSpace =
  | 'srgb'
  | 'srgb-linear'
  | 'display-p3'
  | 'a98-rgb'
  | 'prophoto-rgb'
  | 'rec2020'
  | 'xyz'
  | 'xyz-d50'
  | 'xyz-d65';

type ColorFnString =
  | `color(${ColorSpace} ${number | CSSNone} ${number | CSSNone} ${number | CSSNone})`
  | `color(${ColorSpace} ${number | CSSNone} ${number | CSSNone} ${number | CSSNone} / ${number | CSSNone})`;

/**
 * A CSS color value with structural type safety via template literal types.
 * Covers hex, rgb/rgba, hsl/hsla, hwb, lab, lch, oklab, oklch, color(),
 * and `'transparent'`. All formats use CSS Color 4 space-separated syntax
 * (plus legacy comma syntax for rgb/hsl).
 *
 * Note: `HexColor` (`#${string}`) is intentionally wide — hex digit count
 * cannot be modeled precisely without a combinatorial explosion.
 *
 * Named colors (e.g. `'red'`) and CSS-wide keywords (e.g. `'currentColor'`, `'inherit'`)
 * are intentionally excluded — see the TODO below the union for details.
 *
 * @example
 * const accent: CSSColor = "#ffcc00";
 * const overlay: CSSColor = "rgba(0, 0, 0, 0.5)";
 * const vivid: CSSColor = "oklch(0.7 0.2 120)";
 * const p3: CSSColor = "color(display-p3 1 0.5 0)";
 * const none: CSSColor = "transparent";
 */
export type CSSColor =
  | HexColor
  | RGBString
  | HSLString
  | HWBString
  | LabString
  | LCHString
  | OKLabString
  | OKLCHString
  | ColorFnString
  | 'transparent';

// TODO: Consider adding CSS-wide keywords that are valid in <color> positions:
//   'currentColor'  — inherits the current `color` property value
//   'inherit'       — CSS-wide keyword, inherits from parent
//   'initial'       — resets to the property's initial value
//   'unset'         — behaves as `inherit` or `initial` depending on inheritance
//   'revert'        — reverts to the browser's default stylesheet value
//   'revert-layer'  — reverts to the value from the previous cascade layer
// These are not color values per se, so a separate `CSSColorValue` type that
// unions CSSColor with these keywords may be the cleaner design.
