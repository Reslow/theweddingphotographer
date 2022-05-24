export default function FilterControl({
  setSelectedBtn,
  selectedBtn,
  value,
  setValue,
}) {
  function handleRange(e) {
    if (selectedBtn === "contrast") {
      setValue((prev) => ({
        ...prev,
        contrast: e.target.value,
      }));
    } else if (selectedBtn === "brightness") {
      setValue((prev) => ({
        ...prev,
        brightness: e.target.value,
      }));
    } else if (selectedBtn === "hue") {
      setValue((prev) => ({
        ...prev,
        hue: e.target.value,
      }));
    } else if (selectedBtn === "saturate") {
      setValue((prev) => ({
        ...prev,
        saturate: e.target.value,
      }));
    }
  }
  // console.log(value);

  function handleContrastBtn(e) {
    setSelectedBtn(e.target.name);
  }
  function handleSaturateBtn(e) {
    setSelectedBtn(e.target.name);
  }
  function handleHueBtn(e) {
    setSelectedBtn(e.target.name);
  }
  function handleBrightnessBtn(e) {
    setSelectedBtn(e.target.name);
  }
  function handleNoneBtn() {
    setValue((prev) => ({
      ...prev,
      contrast: "80",
      brightness: "100",
      hue: "0",
      saturate: "100",
    }));
  }

  return (
    <>
      {selectedBtn ? selectedBtn : "no filter is selected"}

      <input
        type="range"
        name="rangeInput"
        min="0"
        max="100"
        onChange={handleRange}
      />
      <button name="contrast" onClick={handleContrastBtn}>
        contrast
      </button>
      <button name="saturate" onClick={handleSaturateBtn}>
        saturate
      </button>
      <button name="hue" onClick={handleHueBtn}>
        hue
      </button>
      <button name="brightness" onClick={handleBrightnessBtn}>
        brightness
      </button>
      <button name="none" onClick={handleNoneBtn}>
        none
      </button>
    </>
  );
}
