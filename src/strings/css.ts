/**
 * 🎨 CSS String Types
 *
 * SmartString types for CSS-related string values.
 *
 * @example
 * // Import and use the branded types to document intent and avoid accidental mix-ups:
 * import { CSSSelector, CSSColor, CSSLength } from '../strings/css';
 *
 * const selector: CSSSelector = ".button.primary > span";
 * const color: CSSColor = "#ff0000";
 * const width: CSSLength = "16px";
 */

import { SmartString } from '../SmartPrimitive';

/* ═══════════════════════════════════════════════════════════════
   SELECTOR TYPES
   ═══════════════════════════════════════════════════════════════ */

/**
 * A CSS selector string
 *
 * @example
 * const btnSelector: CSSSelector = ".nav .button.primary";
 */
export type CSSSelector = SmartString<'CSSSelector'>;

/**
 * An XPath expression
 *
 * @example
 * const firstLink: XPath = "//div[@id='main']//a[1]";
 */
export type XPath = SmartString<'XPath'>;

/* ═══════════════════════════════════════════════════════════════
   IDENTIFIER TYPES
   ═══════════════════════════════════════════════════════════════ */

/**
 * An HTML element ID
 *
 * @example
 * const mainId: HTMLElementID = "main-content";
 */
export type HTMLElementID = SmartString<'HTMLElementID'>;

/**
 * A CSS class name
 *
 * @example
 * const primaryClass: CSSClassName = "button-primary";
 */
export type CSSClassName = SmartString<'CSSClassName'>;

/**
 * An HTML attribute name
 *
 * @example
 * const trackingAttr: HTMLAttribute = "data-tracking-id";
 */
export type HTMLAttribute = SmartString<'HTMLAttribute'>;

/* ═══════════════════════════════════════════════════════════════
   CSS VALUE TYPES
   ═══════════════════════════════════════════════════════════════ */

/**
 * CSS length units
 *
 * Absolute: px, cm, mm, in, pt, pc
 * Relative: em, rem, ex, ch, %
 * Viewport: vw, vh, vmin, vmax
 */
export type CSSLengthUnit =
  | 'px'
  | 'em'
  | 'rem'
  | '%'
  | 'vw'
  | 'vh'
  | 'vmin'
  | 'vmax'
  | 'ch'
  | 'ex'
  | 'cm'
  | 'mm'
  | 'in'
  | 'pt'
  | 'pc';

/**
 * CSS angle units
 */
export type CSSAngleUnit = 'deg' | 'rad' | 'grad' | 'turn';

/**
 * CSS time units
 */
export type CSSTimeUnit = 'ms' | 's';

/**
 * All CSS unit types
 */
export type CSSUnit = CSSLengthUnit | CSSAngleUnit | CSSTimeUnit;

/**
 * A CSS value with a number and unit (e.g., "16px", "1.5em")
 *
 * @example
 * const width: CSSValue<'px'> = "16px";
 * const fontSize: CSSValue<'em'> = "1.5em";
 * const duration: CSSValue<'ms'> = "300ms";
 */
export type CSSUnitValue<U extends CSSUnit = CSSUnit> = `${number}${U}`;

/**
 * A CSS length value with unit
 *
 * @example
 * const width: CSSLength = "16px";
 * const padding: CSSLength = "2rem";
 */
export type CSSLength = CSSUnitValue<CSSLengthUnit>;

/**
 * A CSS angle value with unit
 *
 * @example
 * const rotation: CSSAngle = "45deg";
 * const hueRotation: CSSAngle = "0.5turn";
 */
export type CSSAngle = CSSUnitValue<CSSAngleUnit>;

/**
 * A CSS time value with unit
 *
 * @example
 * const duration: CSSTime = "300ms";
 * const delay: CSSTime = "0.5s";
 */
export type CSSTime = CSSUnitValue<CSSTimeUnit>;

/**
 * A percentage string with `%` suffix (e.g., "30%", "100%")
 *
 * Used for CSS percentage values and formatted display strings.
 *
 * @example
 * const opacity: PercentString = "50%";
 * const progress: PercentString = "100%";
 */
export type PercentString = `${number}%`;

/**
 * CSS easing keywords — the five named curves plus the two step aliases.
 */
export type CSSEasingKeyword =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'step-start'
  | 'step-end';

/**
 * CSS `cubic-bezier(...)` functional notation with exactly four numeric arguments.
 *
 * Enforces the correct argument count at compile time. Semantic constraints
 * (x1 and x2 in [0, 1]) are validated at parse time.
 *
 * @example
 * const ease: CSSCubicBezier = "cubic-bezier(0.42,0,0.58,1)";
 * const ease: CSSCubicBezier = "cubic-bezier(0.42, 0, 0.58, 1)"; // spaces are optional
 */
export type CSSCubicBezier =
  `cubic-bezier(${number},${number},${number},${number})`;

/**
 * CSS multi-stop `linear(...)` timing function (CSS Easing Level 2).
 * Inner content is intentionally loose; exact validation happens at parse time.
 */
export type CSSLinearFn = `linear(${string})`;

/**
 * CSS `steps(...)` functional notation.
 * Inner content is intentionally loose; exact validation happens at parse time.
 */
export type CSSSteps = `steps(${string})`;

/**
 * The union of CSS easing-function forms: keywords + functional notation.
 *
 * This is a TypeScript literal union (not a SmartPrimitive brand), so string
 * literals matching the CSS easing grammar are assignable directly while
 * arbitrary strings are caught at compile time. Dynamic strings need to be
 * narrowed via a runtime parse before assignment.
 *
 * @example
 * const k: CSSEasing = "ease-in-out";                             // keyword
 * const b: CSSEasing = "cubic-bezier(0.42, 0, 0.58, 1)";          // functional
 * const m: CSSEasing = "linear(0 0%, 0.01 1.25%, 0.04 5%)";       // multi-stop linear
 * const s: CSSEasing = "steps(4, end)";                           // steps
 */
export type CSSEasing =
  | CSSEasingKeyword
  | CSSCubicBezier
  | CSSLinearFn
  | CSSSteps;

/**
 * A CSS custom property name
 *
 * Should start with two hyphens (--)
 *
 * @example
 * const themeProp: CSSCustomProperty = "--theme-color";
 * const spacing: CSSCustomProperty = "--spacing-lg";
 */
export type CSSCustomProperty = SmartString<'CSSCustomProperty'>;

/**
 * CSS cursor property values
 *
 * Standard cursor types for interactive elements. Provides autocomplete and
 * type safety for cursor assignments. Includes a fallback for custom cursor
 * URLs like `url("cursor.png"), auto`.
 *
 * @example
 * const dragCursor: CSSCursor = "move";
 * const resizeCursor: CSSCursor = "ns-resize";
 * element.style.cursor = dragCursor;
 *
 * // Custom cursor with fallback
 * const customCursor: CSSCursor = 'url("cursor.png"), pointer';
 */
export type CSSCursor =
  // General
  | 'default'
  | 'pointer'
  | 'wait'
  | 'text'
  | 'help'
  // Drag & Drop
  | 'move'
  | 'grab'
  | 'grabbing'
  | 'copy'
  | 'alias'
  // Resize - Cardinal directions
  | 'n-resize'
  | 's-resize'
  | 'e-resize'
  | 'w-resize'
  // Resize - Diagonal directions
  | 'ne-resize'
  | 'nw-resize'
  | 'se-resize'
  | 'sw-resize'
  // Resize - Two-way
  | 'ns-resize'
  | 'ew-resize'
  | 'nwse-resize'
  | 'nesw-resize'
  // Resize - Row/Column
  | 'col-resize'
  | 'row-resize'
  // Interaction
  | 'crosshair'
  | 'cell'
  | 'zoom-in'
  | 'zoom-out'
  | 'not-allowed'
  | 'no-drop'
  | 'progress'
  | 'context-menu'
  | 'vertical-text'
  | 'all-scroll'
  // Special
  | 'none'
  | 'auto'
  | 'inherit'
  | 'initial'
  | 'unset'
  // Allow custom cursor URLs with fallback: url("..."), format
  | (string & {});
