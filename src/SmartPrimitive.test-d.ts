/**
 * Type-only tests for SmartPrimitive types.
 * These tests are checked at compile-time only (not run at runtime).
 */
import { expectTypeOf, test } from 'vitest';
import {
  SmartBoolean,
  SmartNumber,
  SmartPrimitive,
  SmartString,
  Unbrand,
} from './SmartPrimitive';

// Define example SmartNumber types for testing
type Pixels = SmartNumber<'Pixels'>;
type Milliseconds = SmartNumber<'Milliseconds'>;
type Normalized = SmartNumber<'Normalized'>;
type Degrees = SmartNumber<'Degrees'>;

// Define example SmartString and SmartBoolean types
type URL = SmartString<'URL'>;
type CSSSelector = SmartString<'CSSSelector'>;
type IsVisible = SmartBoolean<'IsVisible'>;
type IsEnabled = SmartBoolean<'IsEnabled'>;

// Define example SmartBigInt and SmartSymbol types
type EntityId = SmartPrimitive<bigint, 'EntityId'>;
type UserId = SmartPrimitive<bigint, 'UserId'>;
type EventType = SmartPrimitive<symbol, 'EventType'>;
type TokenSymbol = SmartPrimitive<symbol, 'TokenSymbol'>;

// =============================================================================
// SmartNumber Type Tests
// =============================================================================

test('SmartNumber types should be properly defined', () => {
  // Type equality tests
  expectTypeOf<Pixels>().toEqualTypeOf<SmartNumber<'Pixels'>>();
  expectTypeOf<Milliseconds>().toEqualTypeOf<SmartNumber<'Milliseconds'>>();
  expectTypeOf<Normalized>().toEqualTypeOf<SmartNumber<'Normalized'>>();
  expectTypeOf<Degrees>().toEqualTypeOf<SmartNumber<'Degrees'>>();
});

test('SmartNumber types should extend number', () => {
  expectTypeOf<Pixels>().toExtend<number>();
  expectTypeOf<Milliseconds>().toExtend<number>();
  expectTypeOf<Normalized>().toExtend<number>();
  expectTypeOf<Degrees>().toExtend<number>();
});

test('plain numbers should be assignable to SmartNumber types', () => {
  const distance: Pixels = 300;
  const duration: Milliseconds = 600;
  const progress: Normalized = 0.5;
  const angle: Degrees = 45;

  expectTypeOf(distance).toEqualTypeOf<Pixels>();
  expectTypeOf(duration).toEqualTypeOf<Milliseconds>();
  expectTypeOf(progress).toEqualTypeOf<Normalized>();
  expectTypeOf(angle).toEqualTypeOf<Degrees>();
});

// =============================================================================
// SmartString Type Tests
// =============================================================================

test('SmartString types should be properly defined', () => {
  expectTypeOf<URL>().toEqualTypeOf<SmartString<'URL'>>();
  expectTypeOf<CSSSelector>().toEqualTypeOf<SmartString<'CSSSelector'>>();
});

test('SmartString types should extend string', () => {
  expectTypeOf<URL>().toExtend<string>();
  expectTypeOf<CSSSelector>().toExtend<string>();
});

test('plain strings should be assignable to SmartString types', () => {
  const url: URL = 'https://example.com';
  const selector: CSSSelector = '.my-class';

  expectTypeOf(url).toEqualTypeOf<URL>();
  expectTypeOf(selector).toEqualTypeOf<CSSSelector>();
});

// =============================================================================
// SmartBoolean Type Tests
// =============================================================================

test('SmartBoolean types should be properly defined', () => {
  expectTypeOf<IsVisible>().toEqualTypeOf<SmartBoolean<'IsVisible'>>();
  expectTypeOf<IsEnabled>().toEqualTypeOf<SmartBoolean<'IsEnabled'>>();
});

test('SmartBoolean types should extend boolean', () => {
  expectTypeOf<IsVisible>().toExtend<boolean>();
  expectTypeOf<IsEnabled>().toExtend<boolean>();
});

test('plain booleans should be assignable to SmartBoolean types', () => {
  const visible: IsVisible = true;
  const enabled: IsEnabled = false;

  // The inferred type should be the SmartBoolean brand
  expectTypeOf(visible).toMatchTypeOf<IsVisible>();
  expectTypeOf(enabled).toMatchTypeOf<IsEnabled>();

  // They should also extend boolean
  expectTypeOf(visible).toExtend<boolean>();
  expectTypeOf(enabled).toExtend<boolean>();
});

// =============================================================================
// SmartPrimitive (bigint) Type Tests
// =============================================================================

test('SmartPrimitive<bigint> types should be properly defined', () => {
  expectTypeOf<EntityId>().toEqualTypeOf<SmartPrimitive<bigint, 'EntityId'>>();
  expectTypeOf<UserId>().toEqualTypeOf<SmartPrimitive<bigint, 'UserId'>>();
});

test('SmartPrimitive<bigint> types should extend bigint', () => {
  expectTypeOf<EntityId>().toExtend<bigint>();
  expectTypeOf<UserId>().toExtend<bigint>();
});

test('plain bigints should be assignable to SmartPrimitive<bigint> types', () => {
  const entityId: EntityId = 123n;
  const userId: UserId = 456n;

  expectTypeOf(entityId).toMatchTypeOf<EntityId>();
  expectTypeOf(userId).toMatchTypeOf<UserId>();

  expectTypeOf(entityId).toExtend<bigint>();
  expectTypeOf(userId).toExtend<bigint>();
});

// =============================================================================
// SmartPrimitive (symbol) Type Tests
// =============================================================================

test('SmartPrimitive<symbol> types should be properly defined', () => {
  expectTypeOf<EventType>().toEqualTypeOf<
    SmartPrimitive<symbol, 'EventType'>
  >();
  expectTypeOf<TokenSymbol>().toEqualTypeOf<
    SmartPrimitive<symbol, 'TokenSymbol'>
  >();
});

test('SmartPrimitive<symbol> types should extend symbol', () => {
  expectTypeOf<EventType>().toExtend<symbol>();
  expectTypeOf<TokenSymbol>().toExtend<symbol>();
});

test('plain symbols should be assignable to SmartPrimitive<symbol> types', () => {
  const clickEvent: EventType = Symbol('click');
  const authToken: TokenSymbol = Symbol('auth');

  expectTypeOf(clickEvent).toMatchTypeOf<EventType>();
  expectTypeOf(authToken).toMatchTypeOf<TokenSymbol>();

  expectTypeOf(clickEvent).toExtend<symbol>();
  expectTypeOf(authToken).toExtend<symbol>();
});

// =============================================================================
// Function Parameter Type Tests
// =============================================================================

test('functions should enforce correct parameter types', () => {
  function moveElement(distance: Pixels, duration: Milliseconds): string {
    return `Moving ${distance}px over ${duration}ms`;
  }

  // Function should expect the correct parameter types
  expectTypeOf(moveElement).parameter(0).toEqualTypeOf<Pixels>();
  expectTypeOf(moveElement).parameter(1).toEqualTypeOf<Milliseconds>();
  expectTypeOf(moveElement).returns.toEqualTypeOf<string>();

  // Should NOT accept wrong types
  expectTypeOf(moveElement).parameter(0).not.toEqualTypeOf<Milliseconds>();
  expectTypeOf(moveElement).parameter(1).not.toEqualTypeOf<Pixels>();
});

// =============================================================================
// Complex Object Structure Type Tests
// =============================================================================

test('complex object structures should maintain type safety', () => {
  type AnimationParams = {
    timing: { duration: Milliseconds; delay: Milliseconds };
    position: { start: Pixels; end: Pixels };
    easing: { progress: Normalized };
    rotation: Degrees;
  };

  // Type-level tests for complex structures
  expectTypeOf<
    AnimationParams['timing']['duration']
  >().toEqualTypeOf<Milliseconds>();
  expectTypeOf<AnimationParams['position']['start']>().toEqualTypeOf<Pixels>();
  expectTypeOf<
    AnimationParams['easing']['progress']
  >().toEqualTypeOf<Normalized>();
  expectTypeOf<AnimationParams['rotation']>().toEqualTypeOf<Degrees>();
});

// =============================================================================
// Cross-Brand Type Safety Tests
// =============================================================================

test('SmartNumber types should not be assignable across brands', () => {
  const pixels = 100 as Pixels;
  const millis = 200 as Milliseconds;

  // These should be correctly typed
  expectTypeOf(pixels).toEqualTypeOf<Pixels>();
  expectTypeOf(millis).toEqualTypeOf<Milliseconds>();

  // These should NOT be assignable to each other
  expectTypeOf(pixels).not.toEqualTypeOf<Milliseconds>();
  expectTypeOf(millis).not.toEqualTypeOf<Pixels>();

  // But they should both extend number
  expectTypeOf(pixels).toExtend<number>();
  expectTypeOf(millis).toExtend<number>();
});

test('SmartString types should not be assignable across brands', () => {
  const url = 'https://example.com' as URL;
  const selector = '.class' as CSSSelector;

  // These should be correctly typed
  expectTypeOf(url).toEqualTypeOf<URL>();
  expectTypeOf(selector).toEqualTypeOf<CSSSelector>();

  // These should NOT be assignable to each other
  expectTypeOf(url).not.toEqualTypeOf<CSSSelector>();
  expectTypeOf(selector).not.toEqualTypeOf<URL>();

  // But they should both extend string
  expectTypeOf(url).toExtend<string>();
  expectTypeOf(selector).toExtend<string>();
});

test('SmartPrimitive types should not be assignable across different base types', () => {
  const pixels = 100 as Pixels;
  const url = 'test' as URL;
  const visible = true as IsVisible;
  const entityId = 123n as EntityId;
  const eventType = Symbol('test') as EventType;

  // These should not be assignable to each other
  expectTypeOf(pixels).not.toExtend<URL>();
  expectTypeOf(pixels).not.toExtend<IsVisible>();
  expectTypeOf(pixels).not.toExtend<EntityId>();
  expectTypeOf(pixels).not.toExtend<EventType>();

  expectTypeOf(url).not.toExtend<Pixels>();
  expectTypeOf(url).not.toExtend<IsVisible>();
  expectTypeOf(url).not.toExtend<EntityId>();
  expectTypeOf(url).not.toExtend<EventType>();

  expectTypeOf(visible).not.toExtend<Pixels>();
  expectTypeOf(visible).not.toExtend<URL>();
  expectTypeOf(visible).not.toExtend<EntityId>();
  expectTypeOf(visible).not.toExtend<EventType>();

  expectTypeOf(entityId).not.toExtend<Pixels>();
  expectTypeOf(entityId).not.toExtend<URL>();
  expectTypeOf(entityId).not.toExtend<IsVisible>();
  expectTypeOf(entityId).not.toExtend<EventType>();

  expectTypeOf(eventType).not.toExtend<Pixels>();
  expectTypeOf(eventType).not.toExtend<URL>();
  expectTypeOf(eventType).not.toExtend<IsVisible>();
  expectTypeOf(eventType).not.toExtend<EntityId>();
});

test('SmartPrimitive<bigint> types should not be assignable across brands', () => {
  const entityId = 123n as EntityId;
  const userId = 456n as UserId;

  expectTypeOf(entityId).toEqualTypeOf<EntityId>();
  expectTypeOf(userId).toEqualTypeOf<UserId>();

  // These should NOT be assignable to each other
  expectTypeOf(entityId).not.toEqualTypeOf<UserId>();
  expectTypeOf(userId).not.toEqualTypeOf<EntityId>();

  // But they should both extend bigint
  expectTypeOf(entityId).toExtend<bigint>();
  expectTypeOf(userId).toExtend<bigint>();
});

test('SmartPrimitive<symbol> types should not be assignable across brands', () => {
  const eventType = Symbol('click') as EventType;
  const tokenSymbol = Symbol('auth') as TokenSymbol;

  expectTypeOf(eventType).toEqualTypeOf<EventType>();
  expectTypeOf(tokenSymbol).toEqualTypeOf<TokenSymbol>();

  // These should NOT be assignable to each other
  expectTypeOf(eventType).not.toEqualTypeOf<TokenSymbol>();
  expectTypeOf(tokenSymbol).not.toEqualTypeOf<EventType>();

  // But they should both extend symbol
  expectTypeOf(eventType).toExtend<symbol>();
  expectTypeOf(tokenSymbol).toExtend<symbol>();
});

// =============================================================================
// Utility Type Tests: Unbrand
// =============================================================================

test('Unbrand should convert complex branded types to primitives', () => {
  type ComplexType = {
    position: { x: Pixels; y: Pixels };
    timing: { duration: Milliseconds; delay: Milliseconds };
    metadata: { url: URL; visible: IsVisible };
    ids: { entity: EntityId; event: EventType };
    plainData: { id: string; count: number };
  };

  type UnbrandedComplex = Unbrand<ComplexType>;

  // Unbrand should convert all branded types to primitives
  expectTypeOf<UnbrandedComplex>().toEqualTypeOf<{
    position: { x: number; y: number };
    timing: { duration: number; delay: number };
    metadata: { url: string; visible: boolean };
    ids: { entity: bigint; event: symbol };
    plainData: { id: string; count: number };
  }>();
});

test('Unbrand should handle mixed branded and plain types', () => {
  type MixedType = {
    branded: Pixels;
    plain: number;
    nested: {
      brandedString: URL;
      plainString: string;
      brandedBool: IsVisible;
      plainBool: boolean;
      brandedBigInt: EntityId;
      plainBigInt: bigint;
      brandedSymbol: EventType;
      plainSymbol: symbol;
    };
  };

  type UnbrandedMixed = Unbrand<MixedType>;

  // All types should become their base primitives
  expectTypeOf<UnbrandedMixed>().toEqualTypeOf<{
    branded: number;
    plain: number;
    nested: {
      brandedString: string;
      plainString: string;
      brandedBool: boolean;
      plainBool: boolean;
      brandedBigInt: bigint;
      plainBigInt: bigint;
      brandedSymbol: symbol;
      plainSymbol: symbol;
    };
  }>();
});

// =============================================================================
// SmartPrimitiveConfig Toggle Compatibility Tests
// =============================================================================

test('utility types should work consistently regardless of SmartPrimitiveConfig toggle', () => {
  // Smart types should always accept their base types
  expectTypeOf<Pixels>().toExtend<number>();
  expectTypeOf<URL>().toExtend<string>();
  expectTypeOf<IsVisible>().toExtend<boolean>();

  // Unbrand should always work consistently
  type TestType = { pixels: Pixels; url: URL; visible: IsVisible };
  type UnbrandedTest = Unbrand<TestType>;

  expectTypeOf<UnbrandedTest>().toEqualTypeOf<{
    pixels: number;
    url: string;
    visible: boolean;
  }>();
});

test('function signatures should be consistent regardless of SmartPrimitiveConfig toggle', () => {
  function animate(
    _distance: Pixels,
    _duration: Milliseconds,
    _url: URL,
  ): void {
    // Implementation not needed for type tests
  }

  // Parameter types should always be what we expect
  expectTypeOf(animate).parameter(0).toExtend<number>();
  expectTypeOf(animate).parameter(1).toExtend<number>();
  expectTypeOf(animate).parameter(2).toExtend<string>();

  // But maintain their specific branded identity
  expectTypeOf(animate).parameter(0).toEqualTypeOf<Pixels>();
  expectTypeOf(animate).parameter(1).toEqualTypeOf<Milliseconds>();
  expectTypeOf(animate).parameter(2).toEqualTypeOf<URL>();
});
