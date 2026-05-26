export type Earthquake = {
  id: string;
  time: string;
  latitude: number;
  longitude: number;
  depth: number;
  mag: number;
  place: string;
  type: string;
};



export type EarthquakeCsvRow = Record<string, string>;