import { useRef } from "react";

export default function Photo() {
  const videoReference = useRef();
  const canvasRef = useRef();

  async function handleStartCamera() {
    if ("mediaDevices" in navigator) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoReference.current.srcObject = stream;
      });
    }
  }

  function handleTakeAPhoto() {
    console.log("snap");
    const width = 400;
    const height = 600;
    let video = videoReference.current;

    let ctx = canvasRef.current.getContext("2d");
    console.log(ctx);

    ctx.drawImage(video, 0, 0, height, width);
  }

  return (
    <section>
      <button id="start-camera" onClick={handleStartCamera}>
        Starta kameran
      </button>
      <button id="take-picture" onClick={handleTakeAPhoto}>
        Ta kort
      </button>
      <video src="" id="camera" autoPlay ref={videoReference}></video>
      {<canvas id="canvas" ref={canvasRef}></canvas>}
      <section>
        <h3>Galleri</h3>
        <section id="gallery"></section>
      </section>
    </section>
  );
}
