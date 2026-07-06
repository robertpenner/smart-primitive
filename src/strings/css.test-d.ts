import { describe, it } from 'vitest';
import type {
  CSSCubicBezier,
  CSSEasing,
  CSSEasingKeyword,
  CSSLinearFn,
  CSSSteps,
} from './css';

describe('CSSEasingKeyword', () => {
  it('accepts all five named curves and two step aliases', () => {
    'linear' satisfies CSSEasingKeyword;
    'ease' satisfies CSSEasingKeyword;
    'ease-in' satisfies CSSEasingKeyword;
    'ease-out' satisfies CSSEasingKeyword;
    'ease-in-out' satisfies CSSEasingKeyword;
    'step-start' satisfies CSSEasingKeyword;
    'step-end' satisfies CSSEasingKeyword;
  });

  it('rejects unknown keywords', () => {
    // @ts-expect-error not a CSS easing keyword
    'bounce' satisfies CSSEasingKeyword;
    // @ts-expect-error not a CSS easing keyword
    'ease-in-out-back' satisfies CSSEasingKeyword;
  });
});

describe('CSSCubicBezier', () => {
  it('accepts four integers without spaces', () => {
    'cubic-bezier(0,0,1,1)' satisfies CSSCubicBezier;
  });

  it('accepts four decimals without spaces', () => {
    'cubic-bezier(0.42,0,0.58,1)' satisfies CSSCubicBezier;
  });

  it('accepts negative and out-of-range control points', () => {
    'cubic-bezier(-0.5,0,1.5,1)' satisfies CSSCubicBezier;
  });

  it('accepts spaces after commas (TypeScript ${number} is permissive)', () => {
    'cubic-bezier(0.42, 0, 0.58, 1)' satisfies CSSCubicBezier;
    'cubic-bezier(0.42, 0, 0.58, 1.0)' satisfies CSSCubicBezier;
  });

  it('rejects missing arguments', () => {
    // @ts-expect-error only three arguments
    'cubic-bezier(0,0,1)' satisfies CSSCubicBezier;
  });

  it('rejects non-numeric content', () => {
    // @ts-expect-error non-numeric argument
    'cubic-bezier(a,b,c,d)' satisfies CSSCubicBezier;
  });

  it('rejects bare keyword', () => {
    // @ts-expect-error not a cubic-bezier string
    'ease' satisfies CSSCubicBezier;
  });
});

describe('CSSLinearFn', () => {
  it('accepts multi-stop linear timing functions', () => {
    'linear(0, 1)' satisfies CSSLinearFn;
    'linear(0 0%, 0.5 50%, 1 100%)' satisfies CSSLinearFn;
    'linear(0 0%, 0.01 1.25%, 0.04 5%)' satisfies CSSLinearFn;
  });

  it('rejects bare linear keyword', () => {
    // @ts-expect-error bare keyword does not match functional notation
    'linear' satisfies CSSLinearFn;
  });
});

describe('CSSSteps', () => {
  it('accepts steps() with count', () => {
    'steps(4)' satisfies CSSSteps;
    'steps(4, end)' satisfies CSSSteps;
    'steps(1, start)' satisfies CSSSteps;
  });

  it('rejects bare step keywords', () => {
    // @ts-expect-error bare keyword does not match functional notation
    'step-start' satisfies CSSSteps;
  });
});

describe('CSSEasing', () => {
  it('accepts all keyword forms', () => {
    'linear' satisfies CSSEasing;
    'ease' satisfies CSSEasing;
    'ease-in' satisfies CSSEasing;
    'ease-out' satisfies CSSEasing;
    'ease-in-out' satisfies CSSEasing;
    'step-start' satisfies CSSEasing;
    'step-end' satisfies CSSEasing;
  });

  it('accepts cubic-bezier functional notation', () => {
    'cubic-bezier(0.42,0,0.58,1)' satisfies CSSEasing;
  });

  it('accepts multi-stop linear functional notation', () => {
    'linear(0 0%, 0.5 50%, 1 100%)' satisfies CSSEasing;
  });

  it('accepts steps functional notation', () => {
    'steps(4, end)' satisfies CSSEasing;
  });

  it('rejects arbitrary strings', () => {
    // @ts-expect-error not a recognized CSS easing form
    'bounce' satisfies CSSEasing;
    // @ts-expect-error not a recognized CSS easing form
    'spring(1, 100, 10, 0)' satisfies CSSEasing;
  });
});
