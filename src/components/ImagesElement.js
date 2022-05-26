export default function ImageElement({ image, images, setImages }) {
  // console.log(images);

  function handleRemoveImage() {
    // console.log("click");
    // console.log(images);
    let newImageArr = images.filter((img) => img.image !== image);
    // console.log(typeof newImageArr.length);
    // console.log(newImageArr);
    setImages(newImageArr);
    // console.log(images);
    localStorage.setItem("cameraApp", JSON.stringify(newImageArr));
  }

  return (
    <section className="img-display">
      <img src={image} alt="a" width="100%" />
      <button onClick={handleRemoveImage} className="delete">
        <img src="/close-outline.png" alt="close" />
      </button>
    </section>
  );
}
