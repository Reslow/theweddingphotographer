import { useRef, useState, useEffect } from "react";
// import ImageElement from "../ImagesElement";
// import FilterControl from "../Filtercontrol";

export default function Photo({
  SetImageIsSaved,
  permission,
  createNotification,
  images,
  setImages,
}) {
  const videoReference = useRef();
  const canvasRef = useRef();
  // const [selectedBtn, setSelectedBtn] = useState(null);
  const [takenPhoto, setTakenPhoto] = useState(false);

  useEffect(() => {
    if ("mediaDevices" in navigator) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoReference.current.srcObject = stream;
      });
    }
    setTakenPhoto(false);
  }, []);

  // const [value, setValue] = useState({
  //   contrast: null,
  //   saturate: null,
  //   hue: null,
  //   brightness: null,
  //   none: "none",
  // });

  function handleTakeAPhoto() {
    let video = videoReference.current;
    let ctx = canvasRef.current.getContext("2d");
    console.log(ctx);

    // video.addEventListener("load", (e) => {
    // ctx.filter = `contrast(${value.contrast}%) saturate(${value.saturate}%) hue-rotate(${value.hue}deg) brightness(${value.brightness}%)`;

    ctx.drawImage(
      video,
      0,
      0,
      canvasRef.current.height,
      canvasRef.current.width
    );
    // });

    const imageData = canvasRef.current?.toDataURL("image/png");
    console.log(imageData);
    console.log(images);

    images.push({
      id: images.length,
      image: imageData,
    });
    setImages(images);
    setTakenPhoto(true);
  }
  // console.log(canvasRef.current);
  function handleSaveImage() {
    setImages(JSON.parse(localStorage.getItem("cameraApp")));
    localStorage.setItem("cameraApp", JSON.stringify(images));
    SetImageIsSaved(true);

    if (permission) {
      createNotification();
    }
  }

  return (
    <section>
      <div
        className="snap"
        style={{ visibility: takenPhoto ? "hidden" : "visible" }}
      >
        {/* <section> */}
        {/* <div
            style={{
              filter: `contrast(${value.contrast}%)`,
            }}
          > */}
        {/* <div
              style={{
                filter: `saturate(${value.saturate}%)`,
              }}
              >
              <div
              style={{
                filter: `hue-rotate(${value.hue}deg)`,
              }}
              >
              <div
              style={{
                filter: `brightness(${value.brightness}%)`,
              }}
            > */}
        <video src="" id="camera" autoPlay ref={videoReference}></video>
        {/* </div>
              </div>
              </div>
              </div>
            </section> */}

        {/* <FilterControl
          selectedBtn={selectedBtn}
          setSelectedBtn={setSelectedBtn}
          value={value}
          setValue={setValue}
        ></FilterControl> */}
        <button className="primary" onClick={handleTakeAPhoto}>
          Ta kort
        </button>
      </div>

      <div
        className="capture"
        style={{ visibility: takenPhoto ? "visible" : "hidden" }}
      >
        <canvas id="canvas" ref={canvasRef} height="480" width="640"></canvas>
        {takenPhoto && <button onClick={handleSaveImage}>Save</button>}
        <button className="primary">capture new moment</button>
      </div>
    </section>
  );
}
