import { create } from "zustand";
import type { Earthquake } from "../types/earthquake";

type EarthquakeStore = {
  selectedEarthquake: Earthquake | null;
  setSelectedEarthquake: (earthquake: Earthquake | null) => void;
};

// Zustand store shares selected earthquake state between the chart and table.
export const useEarthquakeStore = create<EarthquakeStore>((set) => ({
  selectedEarthquake: null,
  setSelectedEarthquake: (earthquake) =>
    set({ selectedEarthquake: earthquake }),
}));