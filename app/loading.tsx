/**
 * Shown during route transitions (any page except initial load).
 * Round spinner so users see loading when navigating to /vehicles, /vehicles/[id], etc.
 */
export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-stone-100 dark:bg-stone-950"
      role="status"
      aria-label="Loading"
    >
      <div
        className="h-8 w-8 shrink-0 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600 dark:border-stone-600 dark:border-t-white"
        aria-hidden
      />
    </div>
  );
}
