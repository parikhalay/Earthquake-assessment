import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Earthquake } from "../types/earthquake";
import { SelectedEarthquakeContext } from "./SelectedEarthquakeContext";


// React Context provider demonstrates another state-sharing approach.
export function SelectedEarthquakeProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [selectedFromContext, setSelectedFromContext] =
    useState<Earthquake | null>(null);

  const value = useMemo(
    () => ({ selectedFromContext, setSelectedFromContext }),
    [selectedFromContext, setSelectedFromContext]
  );

  return (
    <SelectedEarthquakeContext.Provider
      value={value}
    >
      {children}
    </SelectedEarthquakeContext.Provider>
  );
}