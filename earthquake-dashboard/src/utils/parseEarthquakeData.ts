import type { Earthquake, EarthquakeCsvRow } from "../types/earthquake";

export function isValidCsvRow(row: EarthquakeCsvRow) {
  return Boolean(row.id && row.latitude && row.longitude);
}

// Converts raw CSV rows into typed earthquake records that can be used by both the chart and the table.
export function mapCsvRowToEarthquake(row: EarthquakeCsvRow): Earthquake {
  return {
    id: row.id,
    time: row.time,
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    depth: Number(row.depth),
    mag: Number(row.mag),
    place: row.place,
    type: row.type,
  };
}

export function isValidEarthquake(item: Earthquake) {
  return (
    !Number.isNaN(item.latitude) &&
    !Number.isNaN(item.longitude) &&
    !Number.isNaN(item.depth) &&
    !Number.isNaN(item.mag)
  );
}