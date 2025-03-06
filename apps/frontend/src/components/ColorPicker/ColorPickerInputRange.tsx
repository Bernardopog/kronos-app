interface IColorPickerInputRangeProps {
  style: string;
  value: number;
  action: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  minmax: { min: number; max: number };
  ariaLabel: string;
}

export default function ColorPickerInputRange({
  style,
  value,
  action,
  minmax,
  ariaLabel,
}: IColorPickerInputRangeProps) {
  return (
    <input
      style={{
        backgroundImage: style,
      }}
      className="slider 
      w-full rounded-full h-2"
      type="range"
      min={minmax.min}
      max={minmax.max}
      value={value}
      onChange={(ev) => action(ev)}
      aria-label={ariaLabel}
    />
  );
}
