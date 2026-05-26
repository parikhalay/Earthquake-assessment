import { createContext } from "react";
import type { Earthquake } from "../types/earthquake";

export type SelectedEarthquakeContextType = {
  selectedFromContext: Earthquake | null;
  setSelectedFromContext: (earthquake: Earthquake | null) => void;
};

export const SelectedEarthquakeContext =
  createContext<SelectedEarthquakeContextType | null>(null);