/**
 * 📏 Length Units
 *
 * Trait-based types for length/distance values with type-safe conversions.
 */

import type { WithKind, WithUnit } from '../trait-utils';

/* ═══════════════════════════════════════════════════════════════
   LENGTH TYPES
   ═══════════════════════════════════════════════════════════════ */

/**
 * Length in pixels (CSS px).
 * All length types share the 'length' kind.
 */
export type Pixels = WithUnit<'px'> & WithKind<'length'>;

/**
 * Length in em units (relative to font-size).
 * All length types share the 'length' kind.
 */
export type Ems = WithUnit<'em'> & WithKind<'length'>;

/**
 * Length in rem units (relative to root font-size).
 * All length types share the 'length' kind.
 */
export type Rems = WithUnit<'rem'> & WithKind<'length'>;

/**
 * Length in viewport width units.
 * All length types share the 'length' kind.
 */
export type Vw = WithUnit<'vw'> & WithKind<'length'>;

/**
 * Length in viewport height units.
 * All length types share the 'length' kind.
 */
export type Vh = WithUnit<'vh'> & WithKind<'length'>;

/**
 * Length in percent.
 * All length types share the 'length' kind.
 */
export type Percent = WithUnit<'%'> & WithKind<'length'>;

/**
 * Length in points (1pt = 1/72 inch).
 * All length types share the 'length' kind.
 */
export type Points = WithUnit<'pt'> & WithKind<'length'>;

/**
 * Length in inches.
 * All length types share the 'length' kind.
 */
export type Inches = WithUnit<'in'> & WithKind<'length'>;

/**
 * Length in centimeters.
 * All length types share the 'length' kind.
 */
export type Centimeters = WithUnit<'cm'> & WithKind<'length'>;

/**
 * Length in millimeters.
 * All length types share the 'length' kind.
 */
export type Millimeters = WithUnit<'mm'> & WithKind<'length'>;

/**
 * Length in meters.
 * All length types share the 'length' kind.
 */
export type Meters = WithUnit<'m'> & WithKind<'length'>;

/* ═══════════════════════════════════════════════════════════════
   CONVERTERS - Metric
   ═══════════════════════════════════════════════════════════════ */

/** Meters → Centimeters (1m = 100cm) */
export const metersToCentimeters = (m: Meters): Centimeters => m * 100;

/** Centimeters → Meters */
export const centimetersToMeters = (cm: Centimeters): Meters => cm / 100;

/** Centimeters → Millimeters (1cm = 10mm) */
export const centimetersToMillimeters = (cm: Centimeters): Millimeters =>
  cm * 10;

/** Millimeters → Centimeters */
export const millimetersToCentimeters = (mm: Millimeters): Centimeters =>
  mm / 10;

/** Inches → Centimeters (1in = 2.54cm) */
export const inchesToCentimeters = (i: Inches): Centimeters => i * 2.54;

/** Centimeters → Inches */
export const centimetersToInches = (cm: Centimeters): Inches => cm / 2.54;

/* ═══════════════════════════════════════════════════════════════
   CONVERTERS - CSS (context-dependent)
   ═══════════════════════════════════════════════════════════════ */

/** Pixels → Ems for a given font-size */
export const pixelsToEms =
  (fontSize: number) =>
  (px: Pixels): Ems =>
    px / fontSize;

/** Ems → Pixels for a given font-size */
export const emsToPixels =
  (fontSize: number) =>
  (em: Ems): Pixels =>
    em * fontSize;

/** Pixels → Rems for a given root font-size */
export const pixelsToRems =
  (rootFontSize = 16) =>
  (px: Pixels): Rems =>
    px / rootFontSize;

/** Rems → Pixels for a given root font-size */
export const remsToPixels =
  (rootFontSize = 16) =>
  (rem: Rems): Pixels =>
    rem * rootFontSize;

/** Pixels → Vw for a given viewport width */
export const pixelsToVw =
  (viewportWidth: number) =>
  (px: Pixels): Vw =>
    (px / viewportWidth) * 100;

/** Vw → Pixels for a given viewport width */
export const vwToPixels =
  (viewportWidth: number) =>
  (vwVal: Vw): Pixels =>
    (vwVal / 100) * viewportWidth;

/** Pixels → Vh for a given viewport height */
export const pixelsToVh =
  (viewportHeight: number) =>
  (px: Pixels): Vh =>
    (px / viewportHeight) * 100;

/** Vh → Pixels for a given viewport height */
export const vhToPixels =
  (viewportHeight: number) =>
  (vhVal: Vh): Pixels =>
    (vhVal / 100) * viewportHeight;

/* ═══════════════════════════════════════════════════════════════
   CONVERTERS - Print
   ═══════════════════════════════════════════════════════════════ */

/** Inches → Points (1in = 72pt) */
export const inchesToPoints = (i: Inches): Points => i * 72;

/** Points → Inches */
export const pointsToInches = (pt: Points): Inches => pt / 72;

/** Inches → Pixels at 96 DPI (CSS standard) */
export const inchesToPixels = (i: Inches): Pixels => i * 96;

/** Pixels → Inches at 96 DPI (CSS standard) */
export const pixelsToInches = (px: Pixels): Inches => px / 96;

/* ═══════════════════════════════════════════════════════════════
   TYPE FAMILIES: Useful unions for function parameters
   ═══════════════════════════════════════════════════════════════ */

/** Any length unit */
export type LengthUnit =
  | Pixels
  | Ems
  | Rems
  | Vw
  | Vh
  | Percent
  | Points
  | Inches
  | Centimeters
  | Millimeters
  | Meters;

/** CSS absolute length units */
export type CSSAbsoluteLengthUnit =
  | Pixels
  | Points
  | Inches
  | Centimeters
  | Millimeters;

/** CSS relative length units */
export type CSSRelativeLengthUnit = Ems | Rems | Vw | Vh | Percent;

/** Metric length units */
export type MetricLengthUnit = Meters | Centimeters | Millimeters;
