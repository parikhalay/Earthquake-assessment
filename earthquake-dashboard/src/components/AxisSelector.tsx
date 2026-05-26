import type { Earthquake } from "../types/earthquake";

type AxisSelectorProps = {
  readonly label: string;
  readonly value: keyof Earthquake;
  readonly options: ReadonlyArray<keyof Earthquake>;
  readonly onChange: (value: keyof Earthquake) => void;
};

export function AxisSelector({
  label,
  value,
  options,
  onChange,
}: AxisSelectorProps) {
  return (
    <label className="text-sm text-slate-700">
      {label}
      <select
        className="ml-2 rounded border border-slate-300 px-2 py-1"
        value={value}
        onChange={(event) => onChange(event.target.value as keyof Earthquake)}
      >
        {options.map((option) => (
          <option key={String(option)} value={String(option)}>
            {String(option)}
          </option>
        ))}
      </select>
    </label>
  );
}