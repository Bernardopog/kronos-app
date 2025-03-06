import ColorPickerInputRange from "./ColorPickerInputRange";
import ColorPickerInputText from "./ColorPickerInputText";

interface IColorPicker {
  hue: number;
  saturation: number;
  lightness: number;
  setHue: (hue: number) => void;
  setSaturation: (saturation: number) => void;
  setLightness: (lightness: number) => void;
}

export default function ColorPicker({
  hue,
  saturation,
  lightness,
  setHue,
  setSaturation,
  setLightness,
}: IColorPicker) {
  const changeHue = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(ev.target.value) > 360 || Number(ev.target.value) < 0) return;
    else setHue(parseInt(ev.target.value));
  };

  const changeSaturation = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(ev.target.value) > 100 || Number(ev.target.value) < 0) return;
    else setSaturation(parseInt(ev.target.value));
  };

  const changeLightness = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(ev.target.value) > 100 || Number(ev.target.value) < 0) return;
    else setLightness(parseInt(ev.target.value));
  };

  return (
    <>
      <div className="flex justify-between gap-x-1 my-2 p-1 border rounded-lg border-woodsmoke-800">
        <ColorPickerInputText
          name="Hue"
          unit="°"
          value={hue}
          action={changeHue}
          ariaLabel={"Matiz"}
        />
        <ColorPickerInputText
          name="Sat"
          unit="%"
          value={saturation}
          action={changeSaturation}
          ariaLabel={"Saturação"}
        />
        <ColorPickerInputText
          name="Lgt"
          unit="%"
          value={lightness}
          action={changeLightness}
          ariaLabel={"Luminosidade"}
        />
      </div>
      <ColorPickerInputRange
        style="linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))"
        value={hue}
        action={changeHue}
        minmax={{ min: 0, max: 360 }}
        ariaLabel="Ajuste Matiz"
      />
      <ColorPickerInputRange
        style={`linear-gradient(to right, hsl(${hue}, 0%, ${lightness}%), hsl(${hue}, 100%, ${lightness}%))`}
        value={saturation}
        action={changeSaturation}
        minmax={{ min: 0, max: 100 }}
        ariaLabel="Ajuste Saturação"
      />
      <ColorPickerInputRange
        style={`linear-gradient(to right, hsl(${hue}, ${saturation}%, 0%), hsl(${hue}, ${saturation}%, 100%))`}
        value={lightness}
        action={changeLightness}
        minmax={{ min: 0, max: 100 }}
        ariaLabel="Ajuste Luminosidade"
      />
    </>
  );
}
