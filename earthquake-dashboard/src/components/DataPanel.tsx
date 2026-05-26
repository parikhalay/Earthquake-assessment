import { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Earthquake } from "../types/earthquake";
import { useEarthquakeStore } from "../store/earthquakeStore";
import { useSelectedEarthquakeContext } from "../context/useSelectedEarthquakeContext";

type DataPanelProps = Readonly<{
  data: Earthquake[];
}>;

const columns: Array<keyof Earthquake> = [
  "time",
  "latitude",
  "longitude",
  "depth",
  "mag",
  "place",
  "type",
];

export function DataPanel({ data }: DataPanelProps) {
  "use no memo";

  const { selectedEarthquake, setSelectedEarthquake } = useEarthquakeStore();
  const { setSelectedFromContext } = useSelectedEarthquakeContext();

  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  // Virtualization keeps the table fast with thousands of records by rendering only the visible rows instead of the entire dataset at once.
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 42,
    overscan: 10,
  });

  // When a chart point is selected, scroll the corresponding table row into view.
  useEffect(() => {
    if (!selectedEarthquake) return;

    const selectedIndex = data.findIndex(
      (earthquake) => earthquake.id === selectedEarthquake.id,
    );

    if (selectedIndex === -1) return;

    rowVirtualizer.scrollToIndex(selectedIndex, {
      align: "center",
    });

    // rowVirtualizer is intentionally excluded because TanStack Virtual returns
    // functions that React Compiler cannot memoize safely.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEarthquake, data]);

  // Row selection updates both Zustand and Context to demonstrate multiple state-sharing approaches.
  function handleSelect(earthquake: Earthquake) {
    setSelectedEarthquake(earthquake);
    setSelectedFromContext(earthquake);
  }

  return (
    <section className="flex h-full min-h-0 flex-col">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Data Table</h2>
          <p className="text-sm text-slate-500">
            Showing {data.length.toLocaleString()} earthquake records
          </p>
        </div>
      </div>

      <div
        ref={tableContainerRef}
        className="min-h-0 flex-1 overflow-auto rounded-2xl border border-slate-200"
      >
        <table className="w-full min-w-[1100px] border-collapse text-sm">
          <colgroup>
            <col className="w-[230px]" />
            <col className="w-[130px]" />
            <col className="w-[130px]" />
            <col className="w-[120px]" />
            <col className="w-[100px]" />
            <col className="w-[320px]" />
            <col className="w-[120px]" />
          </colgroup>
          <thead className="sticky top-0 z-10 bg-slate-200 text-left text-slate-900">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column)}
                  className="whitespace-nowrap px-3 py-3 font-semibold"
                >
                  {String(column)}
                </th>
              ))}
            </tr>
          </thead>
        </table>

        { /* This creates the full scroll height while only rendering visible rows.*/}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          <table className="absolute left-0 top-0 w-full min-w-[1100px] border-collapse text-sm">
            <tbody
              style={{
                transform: `translateY(${
                  rowVirtualizer.getVirtualItems()[0]?.start ?? 0
                }px)`,
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const earthquake = data[virtualRow.index];
                const isSelected = selectedEarthquake?.id === earthquake.id;

                return (
                  <tr
                    key={earthquake.id}
                    data-index={virtualRow.index}
                    ref={rowVirtualizer.measureElement}
                    onClick={() => handleSelect(earthquake)}
                    className={`cursor-pointer border-b border-slate-200 ${
                      isSelected
                        ? "bg-yellow-100"
                        : "odd:bg-white even:bg-slate-50 hover:bg-blue-50"
                    }`}
                  >
                    {columns.map((column) => (
                      <td
                        key={String(column)}
                        className="whitespace-nowrap px-3 py-2 text-slate-700"
                      >
                        {formatCellValue(earthquake[column])}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function formatCellValue(value: Earthquake[keyof Earthquake]) {
  if (typeof value === "number") {
    return Number.isInteger(value) ? value : value.toFixed(3);
  }

  return value;
}
