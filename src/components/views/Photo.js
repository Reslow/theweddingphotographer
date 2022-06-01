import { useRef, useState, useEffect } from "react";
// import ImageElement from "../ImagesElement";

export default function Photo({
  permission,
  createNotification,
  images,
  setImages,
  setItemsInJSONBin,
  updateSavedImages,
  currentImage,
  setCurrentImage,
}) {
  const videoReference = useRef();
  const canvasRef = useRef();
  const [takenPhoto, setTakenPhoto] = useState(false);

  useEffect(() => {
    if ("mediaDevices" in navigator) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoReference.current.srcObject = stream;
      });
    }
  }, [setImages, images, setItemsInJSONBin]);

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

    setCurrentImage({
      id: images.length,
      image: imageData,
    });
    updateSavedImages(currentImage);

    const text = "img is saved to localstorage";
    localStorage.setItem("cameraApp", JSON.stringify(images));

    setImages(JSON.parse(localStorage.getItem("cameraApp")));
    if (permission) {
      createNotification(text);
    }
  }

  function handleCaptureNew() {
    setTakenPhoto(false);
  }

  return (
    <section className="snapAndCapContainer">
      <div
        className="snap"
        style={{ visibility: takenPhoto ? "hidden" : "visible" }}
      >
        <section>
          <div>
            <video src="" id="camera" autoPlay ref={videoReference}></video>
          </div>
        </section>

        <button className="primary" onClick={handleTakeAPhoto}>
          Ta kort
        </button>
      </div>

      <div
        className="capture"
        style={{ visibility: takenPhoto ? "visible" : "hidden" }}
      >
        <canvas id="canvas" ref={canvasRef} height="480" width="400"></canvas>

        {/* switch views back */}
        <button className="primary" onClick={handleCaptureNew}>
          Capture new moment!
        </button>
      </div>
    </section>
  );
}
