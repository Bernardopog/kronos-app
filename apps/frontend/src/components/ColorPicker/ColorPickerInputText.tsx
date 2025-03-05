interface IColorPickerInputTextProps {
  name: string;
  unit: string;
  value: number;
  action: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ColorPickerInputText({
  name,
  unit,
  value,
  action,
}: IColorPickerInputTextProps) {
  return (
    <>
      <div className="flex gap-x-2">
        <span className="select-none text-woodsmoke-400">{name}:</span>
        <input
          className="w-2/6 bg-transparent text-woodsmoke-100 text-right"
          type="text"
          value={value}
          onChange={(ev) => action(ev)}
        />
        <span className="select-none text-woodsmoke-400">{unit}</span>
      </div>
    </>
  );
}
