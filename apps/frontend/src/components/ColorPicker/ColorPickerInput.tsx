interface IColorPickerInputTextProps {
  name: string;
  unit: string;
  value: number;
  action: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  ariaLabel: string;
}

export default function ColorPickerInput({
  name,
  unit,
  value,
  action,
  ariaLabel,
}: IColorPickerInputTextProps) {
  return (
    <>
      <div className="flex gap-x-2">
        <span className="select-none text-woodsmoke-700 dark:text-woodsmoke-400">
          {name}:
        </span>
        <input
          aria-label={ariaLabel}
          className="w-2/6 bg-transparent text-right text-woodsmoke-950 dark:text-woodsmoke-100"
          type="number"
          value={value}
          onChange={(ev) => action(ev)}
        />
        <span className="select-none text-woodsmoke-400">{unit}</span>
      </div>
    </>
  );
}
