import { useRef, useState, useEffect } from "react";
// import ImageElement from "../ImagesElement";

export default function Photo({
  permission,
  createNotification,
  images,
  setImages,
  setItemsInJSONBin,
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
    async function getSavedImages() {
      const response = await fetch(
        "https://api.jsonbin.io/b/6293d219402a5b3802138cd6",
        {
          headers: {
            "X-Master-Key": API_KEY_JSON_BIN,
          },
        }
      );
      const data = await response.json();

      setImages(data.images);
      return data.images;
    }
    setTakenPhoto(false);
    if (navigator.onLine) {
      getSavedImages();
    }
  }, [setImages, setItemsInJSONBin]);
  console.log(`checking if we have image ${JSON.stringify(images)}`);

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

    if (navigator.onLine) {
      updateSavedImages(images, currentImage);
      if (permission) {
        const text = "img is saved to jsonBin";
        createNotification(text);
      }
    } else {
      const text = "img is saved to localstorage";
      localStorage.setItem("cameraApp", JSON.stringify(images));
      setImages(JSON.parse(localStorage.getItem("cameraApp")));
      if (permission) {
        createNotification(text);
      }
    }
  }

  function handleCaptureNew() {
    setTakenPhoto(false);
  }

  async function updateSavedImages(images, currentImage) {
    console.log(currentImage);
    console.log(
      `this is IMG arr  after push of new arr${JSON.stringify(images)}}`
    );
    images.push(currentImage);
    console.log(images);
    const response = await fetch(
      "https://api.jsonbin.io/b/6293d219402a5b3802138cd6",
      {
        method: "PUT",
        body: JSON.stringify({ images: images }),
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY_JSON_BIN,
        },
      }
    );
    const data = await response.json();
    setItemsInJSONBin(data.data);
    setImages(data.data);
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
        <canvas id="canvas" ref={canvasRef} height="200" width="400"></canvas>

        {/* switch views back */}
        <button className="primary" onClick={handleCaptureNew}>
          Capture new moment!
        </button>
      </div>
    </section>
  );
}
