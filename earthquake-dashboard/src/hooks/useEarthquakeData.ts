import { useEffect, useState } from "react";
import Papa from "papaparse";
import type { Earthquake, EarthquakeCsvRow } from "../types/earthquake";
import {
  isValidCsvRow,
  isValidEarthquake,
  mapCsvRowToEarthquake,
} from "../utils/parseEarthquakeData";

// Public USGS CSV feed containing recent earthquake activity.
const DATA_URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv";

function parseEarthquakeData(csvText: string): Promise<Earthquake[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<EarthquakeCsvRow>(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data
          .filter(isValidCsvRow)
          .map(mapCsvRowToEarthquake)
          .filter(isValidEarthquake);

        resolve(parsedData);
      },
      error: () => {
        reject(new Error("Failed to parse earthquake data."));
      },
    });
  });
}

async function fetchEarthquakeData(): Promise<Earthquake[]> {
  const response = await fetch(DATA_URL);

  if (!response.ok) {
    throw new Error("Failed to load earthquake data.");
  }

  const csvText = await response.text();
  return parseEarthquakeData(csvText);
}

export function useEarthquakeData() {
  const [data, setData] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetches and parses the CSV once when the app loads.
  // The loading and error states are used to give users clear feedback.
  useEffect(() => {
    fetchEarthquakeData()
      .then((earthquakeData) => {
        setData(earthquakeData);
      })
      .catch(() => {
        setError("Failed to load earthquake data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
