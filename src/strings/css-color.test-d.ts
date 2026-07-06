import { describe, it } from 'vitest';
import type { CSSColor } from './css-color';

describe('CSSColor', () => {
  it('accepts hex colors', () => {
    '#fff' satisfies CSSColor;
    '#ffffff' satisfies CSSColor;
    '#ffffffaa' satisfies CSSColor;
    '#Anything' satisfies CSSColor; // HexColor is intentionally wide
  });

  it('accepts legacy RGB', () => {
    'rgb(255, 0, 128)' satisfies CSSColor;
    'rgba(255, 0, 128, 0.5)' satisfies CSSColor;
  });

  it('accepts modern RGB', () => {
    'rgb(255 0 128)' satisfies CSSColor;
    'rgb(255 0 128 / 0.5)' satisfies CSSColor;
  });

  it('accepts legacy HSL', () => {
    'hsl(120, 50%, 75%)' satisfies CSSColor;
    'hsla(120, 50%, 75%, 0.5)' satisfies CSSColor;
  });

  it('accepts modern HSL', () => {
    'hsl(120 50% 75%)' satisfies CSSColor;
    'hsl(120 50% 75% / 0.5)' satisfies CSSColor;
  });

  it('accepts HWB', () => {
    'hwb(120 10% 20%)' satisfies CSSColor;
    'hwb(120 10% 20% / 0.5)' satisfies CSSColor;
  });

  it('accepts Lab', () => {
    'lab(50 20 -30)' satisfies CSSColor;
    'lab(50% 20% -30%)' satisfies CSSColor;
    'lab(50 20 -30 / 0.8)' satisfies CSSColor;
    'lab(none 20 -30 / none)' satisfies CSSColor;
  });

  it('accepts LCH', () => {
    'lch(50 30 120)' satisfies CSSColor;
    'lch(50% 30% 120)' satisfies CSSColor;
    'lch(50 30 120 / 0.8)' satisfies CSSColor;
    'lch(none 30 none)' satisfies CSSColor;
    'lch(50 none 120 / none)' satisfies CSSColor;
  });

  it('accepts OKLab with numeric channels', () => {
    'oklab(0.5 0.1 -0.1)' satisfies CSSColor;
    'oklab(0.5 0.1 -0.1 / 0.8)' satisfies CSSColor;
  });

  it('accepts OKLab with percent channels', () => {
    'oklab(50% 10% -5%)' satisfies CSSColor;
    'oklab(50% 10% -5% / 0.8)' satisfies CSSColor;
  });

  it('accepts OKLCH with numeric channels', () => {
    'oklch(0.5 0.2 120)' satisfies CSSColor;
    'oklch(0.5 0.2 120 / 0.8)' satisfies CSSColor;
    'oklch(none 0.2 none)' satisfies CSSColor;
    'oklch(0.5 none 120 / none)' satisfies CSSColor;
  });

  it('accepts OKLCH with percent channels', () => {
    'oklch(50% 20% 120)' satisfies CSSColor;
    'oklch(50% 20% 120 / 0.8)' satisfies CSSColor;
  });

  it('accepts color() with named colorspace', () => {
    'color(srgb 1 0.5 0)' satisfies CSSColor;
    'color(display-p3 1 0.5 0)' satisfies CSSColor;
    'color(display-p3 1 0.5 0 / 0.8)' satisfies CSSColor;
    'color(rec2020 0.2 0.8 0.4)' satisfies CSSColor;
    'color(xyz-d65 0.2 0.1 0.9)' satisfies CSSColor;
  });

  it('accepts transparent', () => {
    'transparent' satisfies CSSColor;
  });

  it('rejects named colors', () => {
    // @ts-expect-error named colors are not modeled
    'red' satisfies CSSColor;
    // @ts-expect-error named colors are not modeled
    'blue' satisfies CSSColor;
  });

  it('rejects arbitrary strings', () => {
    // @ts-expect-error not a recognized color format
    'not-a-color' satisfies CSSColor;
    // @ts-expect-error not a recognized color format
    '' satisfies CSSColor;
  });
});
