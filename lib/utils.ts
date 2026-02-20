/**
 * Merges class names. Accepts strings, numbers, and arrays; filters out falsy values.
 * Use for conditional or combined Tailwind classes.
 */
export function cn(
  ...inputs: (string | number | boolean | undefined | null | (string | number | boolean | undefined | null)[])[]
): string {
  return inputs
    .flat()
    .filter((x) => typeof x === "string" || typeof x === "number")
    .join(" ");
}
