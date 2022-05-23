export default function ImageElement({ image, images, setImages }) {
  console.log(images);

  function handleRemoveImage() {
    console.log("click");
    console.log(images);
    let newImageArr = images.filter((img) => img.image !== image);
    console.log(typeof newImageArr.length);
    console.log(newImageArr);
    setImages(newImageArr);
    console.log(images);
    localStorage.setItem("cameraApp", JSON.stringify(newImageArr));
  }

  return (
    <section>
      <img src={image} alt="a" />
      <button onClick={handleRemoveImage}>remove</button>
    </section>
  );
}
