import { useContext } from "react";
import { SelectedEarthquakeContext } from "./SelectedEarthquakeContext";

export function useSelectedEarthquakeContext() {
  const context = useContext(SelectedEarthquakeContext);

  if (!context) {
    throw new Error(
      "useSelectedEarthquakeContext must be used inside SelectedEarthquakeProvider"
    );
  }

  return context;
}