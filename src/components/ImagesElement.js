export default function ImageElement({ image, images, setImages }) {
  // console.log(images);

  function handleRemoveImage() {
    let newImageArr = images.images.filter((img) => img.image !== image);
    setImages(newImageArr);
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
