/**
 * Extend React's HTML attribute types to include `inert`.
 * The `inert` attribute is valid HTML but not yet in React 18's type definitions.
 * It prevents keyboard focus and screen reader access to an element and its subtree,
 * making it ideal for collapsed accordion panels that need CSS-animated height.
 *
 * Remove this file when upgrading to React 19+ (which includes `inert` natively).
 */
declare namespace React {
  interface HTMLAttributes<T> {
    inert?: '' | undefined;
  }
}
