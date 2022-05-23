export default function FilterControl({
  setSelectedBtn,
  selectedBtn,
  value,
  setValue,
}) {
  function handleRange(e) {
    console.log(e.target.name);
    setValue(e.target.value);
  }

  function handleContrastBtn(e) {
    console.log(e.target.name);
    setSelectedBtn(e.target.name);
  }
  function handleInvertBtn(e) {
    console.log(e.target.name);
    setSelectedBtn(e.target.name);
  }
  function handleSaturationBtn(e) {
    console.log(e.target.name);
    setSelectedBtn(e.target.name);
  }
  function handleSepiaBtn(e) {
    console.log(e.target.name);
    setSelectedBtn(e.target.name);
  }

  function handleNoneBtn(e) {
    console.log(e.target.name);
    setSelectedBtn(e.target.name);
  }

  return (
    <>
      {selectedBtn ? selectedBtn : "no filter is selected"}
      {value ? value : ""}
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
      <button name="sepia" onClick={handleSepiaBtn}>
        blue
      </button>
      <button name="saturation" onClick={handleSaturationBtn}>
        saturation
      </button>
      <button name="invert" onClick={handleInvertBtn}>
        pink
      </button>
      <button name="none" onClick={handleNoneBtn}>
        none
      </button>
    </>
  );
}
