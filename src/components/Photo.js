import { useRef, useState } from "react";
import ImageElement from "./ImagesElement";

export default function Photo() {
  const videoReference = useRef();
  const canvasRef = useRef();
  const [images, setImges] = useState([]);

  async function handleStartCamera() {
    if ("mediaDevices" in navigator) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoReference.current.srcObject = stream;
      });
    }
  }

  function handleTakeAPhoto() {
    let video = videoReference.current;
    console.log(video);

    let ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(
      video,
      0,
      0,
      canvasRef.current.height,
      canvasRef.current.width
    );
    console.log(ctx);
    const imageData = canvasRef.current?.toDataURL("image/png");

    console.log(imageData);
    images.push({
      id: images.length,
      image: imageData,
    });

    setImges(images);

    localStorage.setItem("cameraApp", JSON.stringify(images));
  }

  let imageCollection = JSON.parse(localStorage.getItem("cameraApp"));
  console.log(imageCollection);

  return (
    <section>
      <button id="start-camera" onClick={handleStartCamera}>
        Starta kameran
      </button>
      <button id="take-picture" onClick={handleTakeAPhoto}>
        Ta kort
      </button>
      <video src="" id="camera" autoPlay ref={videoReference}></video>
      {<canvas id="canvas" ref={canvasRef} height="480" width="640"></canvas>}
      <section>
        <h3>Galleri</h3>
        <section id="gallery">
          {imageCollection?.map((image, index) => {
            return <ImageElement image={image.image} key={index} />;
          })}
        </section>
      </section>
    </section>
  );
}
