import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ScatterProps } from "recharts";
import type { Earthquake } from "../types/earthquake";
import { useEarthquakeStore } from "../store/earthquakeStore";
import { AxisSelector } from "./AxisSelector";

type ChartPanelProps = Readonly<{
  data: ReadonlyArray<Earthquake>;
  xAxis: keyof Earthquake;
  yAxis: keyof Earthquake;
  setXAxis: (value: keyof Earthquake) => void;
  setYAxis: (value: keyof Earthquake) => void;
}>;

// These are the numeric fields users can choose for the chart axes.
const numericFields: ReadonlyArray<keyof Earthquake> = [
  "latitude",
  "longitude",
  "depth",
  "mag",
];

type ScatterPointProps = ScatterProps & {
  cx?: number;
  cy?: number;
  payload?: Earthquake;
};

// Custom scatter point lets us style each chart point based on the selected row.
// This replaces the deprecated Recharts Cell API.
function CustomScatterPoint({ cx, cy, payload }: ScatterPointProps) {
  const selectedEarthquake = useEarthquakeStore(
    (state) => state.selectedEarthquake,
  );
  const setSelectedEarthquake = useEarthquakeStore(
    (state) => state.setSelectedEarthquake,
  );

  if (cx === undefined || cy === undefined || !payload) {
    return null;
  }

  const isSelected = selectedEarthquake?.id === payload.id;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={isSelected ? 7 : 4}
      fill={isSelected ? "#ef4444" : "#2563eb"}
      opacity={isSelected ? 1 : 0.75}
      stroke={isSelected ? "#991b1b" : "none"}
      strokeWidth={isSelected ? 2 : 0}
      className="cursor-pointer transition-all"
      onMouseEnter={() => setSelectedEarthquake(payload)}
      // Selecting a chart point updates global state, which highlights and scrolls the matching row in the virtualized table.
      onClick={() => setSelectedEarthquake(payload)}
    />
  );
}

export function ChartPanel({
  data,
  xAxis,
  yAxis,
  setXAxis,
  setYAxis,
}: ChartPanelProps) {
  return (
    <section className="flex h-full min-h-0 flex-col">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Chart</h2>
          <p className="text-sm text-slate-500">
            Click a point to highlight the matching table row.
          </p>
        </div>

        <div className="flex gap-2">
          <AxisSelector
            label="X Axis"
            value={xAxis}
            options={numericFields}
            onChange={setXAxis}
          />
          <AxisSelector
            label="Y Axis"
            value={yAxis}
            options={numericFields}
            onChange={setYAxis}
          />
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              type="number"
              dataKey={xAxis}
              name={String(xAxis)}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              type="number"
              dataKey={yAxis}
              name={String(yAxis)}
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(value, name) => [value, name]}
              labelFormatter={() => ""}
            />

            <Scatter
              data={data}
              shape={<CustomScatterPoint />}
              isAnimationActive={false}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
