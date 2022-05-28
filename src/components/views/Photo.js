import { useRef, useState, useEffect } from "react";
// import ImageElement from "../ImagesElement";

export default function Photo({
  SetImageIsSaved,
  permission,
  createNotification,
  images,
  setImages,
  setItemsInJSONBin,
  isOnline,
}) {
  const videoReference = useRef();
  const canvasRef = useRef();
  const [takenPhoto, setTakenPhoto] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const API_KEY_JSON_BIN =
    "$2b$10$x2BMUJLMX7kIpkqMhEdg6e/ElCz1IilxZteD2TusAeiSUaItebbE2";

  useEffect(() => {
    if ("mediaDevices" in navigator) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoReference.current.srcObject = stream;
      });
    }
    setTakenPhoto(false);
  }, []);

  function handleTakeAPhoto() {
    let video = videoReference.current;
    let ctx = canvasRef.current.getContext("2d");
    console.log(ctx);

    ctx.drawImage(
      video,
      0,
      0,
      canvasRef.current.height,
      canvasRef.current.width
    );

    const imageData = canvasRef.current?.toDataURL("image/png");
    console.log(imageData);
    console.log(images);

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

    setImages(JSON.parse(localStorage.getItem("cameraApp")));
    localStorage.setItem("cameraApp", JSON.stringify(images));
    SetImageIsSaved(true);

    if (permission) {
      createNotification();
    }
  }

  function handleCaptureNew() {
    console.log("new capture");
    setTakenPhoto(false);
  }

  async function getSavedImages() {
    const response = await fetch(
      "https://api.jsonbin.io/b/6291234a402a5b380210cf08/latest",
      {
        headers: {
          "X-master-Key": API_KEY_JSON_BIN,
        },
      }
    );
    const data = await response.json();
    return data.images;
  }

  async function updateSavedImages() {
    const imagesarr = await getSavedImages();

    imagesarr.push(currentImage);

    const response = await fetch(
      "https://api.jsonbin.io/b/6291234a402a5b380210cf08",
      {
        method: "PUT",
        body: JSON.stringify({ images: [currentImage] }),
        headers: {
          "Content-Type": "application/json",
          "X-master-Key": API_KEY_JSON_BIN,
        },
      }
    );
    const data = await response.json();
    setItemsInJSONBin(data);
  }

  if (isOnline) {
    updateSavedImages();
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
        <canvas id="canvas" ref={canvasRef} height="480" width="640"></canvas>

        {/* switch views back */}
        <button className="primary" onClick={handleCaptureNew}>
          Capture new moment!
        </button>
      </div>
    </section>
  );
}
