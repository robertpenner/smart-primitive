/**
 * Module augmentation that disables branded types.
 *
 * Add a file like this to your project to make all SmartPrimitive types
 * collapse to their plain base primitives (number, string, boolean, etc.).
 *
 * The `export {}` is required — without it, TypeScript treats this as an
 * ambient module declaration (replacing the module) instead of an
 * augmentation (merging into the existing module).
 */
export {};

declare module '@penner/smart-primitive' {
  interface SmartPrimitiveConfig {
    usePlainPrimitives: true;
  }
}
