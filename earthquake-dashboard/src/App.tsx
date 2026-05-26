import { useState } from "react";
import { useEarthquakeData } from "./hooks/useEarthquakeData";
import { ChartPanel } from "./components/ChartPanel";
import { DataPanel } from "./components/DataPanel";
import { LoadingState } from "./components/LoadingState";
import type { Earthquake } from "./types/earthquake";

export default function App() {
  const { data, loading, error } = useEarthquakeData();


  const [xAxis, setXAxis] = useState<keyof Earthquake>("longitude");
  const [yAxis, setYAxis] = useState<keyof Earthquake>("latitude");

  if (loading) return <LoadingState />;

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
        <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-xl">
          <h1 className="mb-2 text-xl font-semibold text-red-600">
            Something went wrong
          </h1>
          <p className="text-slate-700">{error}</p>
        </div>
      </main>
    );
  }

  const totalEarthquakes = data.length;

  const strongestMagnitude =
    data.length > 0 ? Math.max(...data.map((item) => item.mag)) : 0;

  const averageDepth =
    data.length > 0
      ? data.reduce((sum, item) => sum + item.depth, 0) / data.length
      : 0;

  return (
    <main className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 text-slate-100">
      <div className="flex h-full w-full flex-col gap-4">
        <header className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="mb-1 text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">
                USGS Geographic Data
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-white">
                Earthquake Data Explorer
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Explore recent earthquake activity through an interactive chart
                and a connected data table. Hover or click a row to highlight
                its matching chart point.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:min-w-[520px]">
              <StatCard
                label="Total Records"
                value={totalEarthquakes.toLocaleString()}
              />
              <StatCard
                label="Strongest Magnitude"
                value={strongestMagnitude.toFixed(1)}
              />
              <StatCard
                label="Average Depth"
                value={`${averageDepth.toFixed(1)} km`}
              />
            </div>
          </div>
        </header>

        <section className="grid min-h-0 flex-1 grid-cols-1 gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="min-h-0 rounded-3xl border border-white/10 bg-white/95 p-4 text-slate-900 shadow-2xl">
            <ChartPanel
              data={data.filter((item) => item.mag >= 2.5)}
              xAxis={xAxis}
              yAxis={yAxis}
              setXAxis={setXAxis}
              setYAxis={setYAxis}
            />
          </div>

          <div className="min-h-0 rounded-3xl border border-white/10 bg-white/95 p-4 text-slate-900 shadow-2xl">
            <DataPanel data={data} />
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-lg backdrop-blur">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-300">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}