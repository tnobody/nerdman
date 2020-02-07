import { useState, useEffect, useCallback, useMemo } from "react";

export const BreakPoints = {
  SM: " (min-width: 640px) ",
  MD: "(min-width: 768px)",
  LG: " (min-width: 1024px)",
  XL: "(min-width: 1280px)"
};

export function useMedia<T>(queries: string[], values: T[], defaultValue: T) {
  // Array containing a media query list for each query
  const mediaQueryLists = useMemo(
    () => queries.map(q => window.matchMedia(q)),
    [queries]
  );

  // Function that gets value based on matching media query
  const getValue = useCallback(() => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex(mql => mql.matches);
    // Return related value or defaultValue if none
    return typeof values[index] !== "undefined" ? values[index] : defaultValue;
  }, [mediaQueryLists, values, defaultValue]);

  // State and setter for matched value
  const [value, setValue] = useState(getValue);

  useEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue);
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach(mql => mql.addListener(handler));
      // Remove listeners on cleanup
      return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
    },
    [getValue, mediaQueryLists] // Empty array ensures effect is only run on mount and unmount
  );

  return value;
}
