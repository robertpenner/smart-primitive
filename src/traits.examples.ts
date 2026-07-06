/**
 * 🎯 Intersection-Based Traits Examples
 *
 * Demonstrates the gradual, composable approach to traits using intersections.
 */

import type { SmartNumber } from './SmartPrimitive';
import {
  clamp,
  type WithClamped,
  type WithRange,
  type WithUnit,
} from './trait-utils';
import type {
  ClampedNormalized,
  Normalized,
  Percentage,
  SignedNormalized,
} from './units/normalized';

/* ═══════════════════════════════════════════════════════════════
   BASIC USAGE - Range Trait
   ═══════════════════════════════════════════════════════════════ */

// A normalized value with reference range [0, 1]
// This is unclamped by default - can exceed the range
const progress: Normalized = 0.75;
const overshoot: Normalized = 1.2; // ✅ Allowed - unclamped

console.log(`Progress: ${progress}`);
console.log(`Overshoot (unclamped): ${overshoot}`);

// Signed normalized values use [-1, 1] range
const control: SignedNormalized = -0.5; // ✅ Can be negative
const extreme: SignedNormalized = 1.5; // ✅ Still unclamped

console.log(`Control value: ${control}`);

// Percentages have a different reference range
const completion: Percentage = 75;
const overtime: Percentage = 120; // ✅ Allowed - unclamped

console.log(`Completion: ${completion}%`);

/* ═══════════════════════════════════════════════════════════════
   CLAMPED TRAIT
   ═══════════════════════════════════════════════════════════════ */

// Clamped normalized - guaranteed to be in [0, 1]
const opacity: ClampedNormalized = 0.8; // ✅ Within range
// const invalid: ClampedNormalized = 1.5; // ❌ Would be type error (in strict contexts)

console.log(`Opacity (clamped): ${opacity}`);

/* ═══════════════════════════════════════════════════════════════
   CLAMPING OPERATIONS
   ═══════════════════════════════════════════════════════════════ */

// Convert unclamped to clamped
const unclamped: Normalized = 1.5;
const clamped = clamp(unclamped, 0, 1);
// Type is now Normalized & Clamped
console.log(`Clamped ${unclamped} to ${clamped}`); // 1.0

// Clamp preserves all traits from the input type
const loose: Normalized = -0.3;
const safe = clamp(loose, 0, 1);
console.log(`Clamped ${loose} to ${safe}`); // 0.0

/* ═══════════════════════════════════════════════════════════════
   CUSTOM TYPES WITH TRAITS
   ═══════════════════════════════════════════════════════════════ */

// Units trait provides semantic distinction without SmartNumber branding
type Meters = WithUnit<'meters'>;
type Seconds = WithUnit<'seconds'>;

const distance: Meters = 100;
const time: Seconds = 5;
// const mixed: Meters = time; // ❌ Type error - different units

console.log(`Distance: ${distance}m, Time: ${time}s`);

// Combine units with range for additional semantics
type Speed = WithUnit<'m/s'> & WithRange<0, 100>;
const velocity: Speed = 55;
console.log(`Velocity: ${velocity}m/s`);

// Use SmartNumber branding when same units need distinction
type Width = SmartNumber<'Width'> & WithUnit<'px'>;
type Height = SmartNumber<'Height'> & WithUnit<'px'>;

const w: Width = 800;
const h: Height = 600;
// const invalid: Width = h; // ❌ Type error - different brands

console.log(`Dimensions: ${w}px × ${h}px`);

/* ═══════════════════════════════════════════════════════════════
   COMBINING TRAITS INCREMENTALLY
   ═══════════════════════════════════════════════════════════════ */

// Start with just a SmartNumber
type Temperature = SmartNumber<'Temperature'>;
const temp1: Temperature = 20;

// Add range information
type TemperatureWithRange = Temperature & WithRange<-273.15, 1000>;
const temp2: TemperatureWithRange = 100;

// Add clamping constraint
type ClampedTemperature = TemperatureWithRange & WithClamped;
const temp3: ClampedTemperature = 50;

console.log(`Temperatures: ${temp1}°C, ${temp2}°C, ${temp3}°C`);

/* ═══════════════════════════════════════════════════════════════
   BENEFITS OF INTERSECTION APPROACH
   ═══════════════════════════════════════════════════════════════ */

/*
 * 1. **Gradual adoption** - Add traits only when needed
 * 2. **No boilerplate** - Don't specify traits you don't care about
 * 3. **Composable** - Combine any traits via &
 * 4. **Clear intent** - Each trait has a single purpose
 * 5. **Zero overhead** - All phantom types, compiled away
 */

// Example: Only care about range? Just use Range
type SimpleNormalized = WithRange<0, 1>;
const simple: SimpleNormalized = 0.5;

// Need clamping too? Add Clamped
type StrictNormalized = WithRange<0, 1> & WithClamped;
const strict: StrictNormalized = 0.5;

console.log(`Simple: ${simple}, Strict: ${strict}`);

/* ═══════════════════════════════════════════════════════════════
   TYPE SAFETY
   ═══════════════════════════════════════════════════════════════ */

// Different ranges are distinct types
const norm: Normalized = 0.5;
const percent: Percentage = 50;
// const mixed: Normalized = percent; // ❌ Type error - different ranges

// Clamped vs unclamped are distinct
const loose2: Normalized = 0.5;
const tight: ClampedNormalized = 0.5;
// These are different types but both accept plain numbers

console.log('✅ Type safety maintained with minimal overhead!');
