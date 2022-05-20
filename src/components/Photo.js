import { useRef } from "react";

export default function Photo() {
  const canvas = useRef(null);
  const camera = useRef(null);

  let stream;
  const ctx = canvas.getContext("2d");
  async function handleStartCamera() {
    console.log("click");
    if ("mediaDevices" in navigator) {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      console.log(stream);
      camera.srcObject = stream;
    }
  }

  return (
    <section>
      <button id="start-camera" onClick={handleStartCamera}>
        Starta kameran
      </button>
      <button id="take-picture">Ta kort</button>
      <video src="" id="camera" autoPlay useref={camera}></video>
      <canvas id="picture" useref={canvas}></canvas>

      <section>
        <h3>Galleri</h3>
        <section id="gallery"></section>
      </section>
    </section>
  );
}
