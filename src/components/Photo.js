import { useRef, useState } from "react";
import ImageElement from "./ImagesElement";

export default function Photo() {
  const videoReference = useRef();
  const canvasRef = useRef();

  let itemsInLocalstorage = JSON.parse(localStorage.getItem("cameraApp"));
  console.log(itemsInLocalstorage);

  const [images, setImages] = useState(
    itemsInLocalstorage?.length > 0 ? itemsInLocalstorage : []
  );

  const [takenPhoto, setTakenPhoto] = useState(false);

  async function handleStartCamera() {
    if ("mediaDevices" in navigator) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoReference.current.srcObject = stream;
      });
    }
  }

  function handleTakeAPhoto() {
    let video = videoReference.current;
    let ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(
      video,
      0,
      0,
      canvasRef.current.height,
      canvasRef.current.width
    );

    const imageData = canvasRef.current?.toDataURL("image/png");

    images.push({
      id: images.length,
      image: imageData,
    });
    setImages(images);

    setTakenPhoto(true);
  }

  function handleSaveImage() {
    localStorage.setItem("cameraApp", JSON.stringify(images));
    setImages(JSON.parse(localStorage.getItem("cameraApp")));
  }

  console.log(images);
  return (
    <section>
      <button id="start-camera" onClick={handleStartCamera}>
        Starta kameran
      </button>
      <button id="take-picture" onClick={handleTakeAPhoto}>
        Ta kort
      </button>
      <video src="" id="camera" autoPlay ref={videoReference}></video>

      <canvas id="canvas" ref={canvasRef} height="480" width="640"></canvas>
      {takenPhoto && <button onClick={handleSaveImage}>Save</button>}
      <section>
        <h3>Galleri</h3>
        <section id="gallery">
          {images.length > 0 &&
            images.map((image, index) => {
              return (
                <ImageElement
                  image={image.image}
                  images={images}
                  key={index}
                  setImages={setImages}
                />
              );
            })}
        </section>
      </section>
    </section>
  );
}
