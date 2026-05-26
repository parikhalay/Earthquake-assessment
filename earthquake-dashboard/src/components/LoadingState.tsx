export function LoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="rounded-xl bg-white p-6 shadow">
        <p className="text-slate-700">Loading earthquake data...</p>
      </div>
    </div>
  );
}