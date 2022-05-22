import { useRef } from "react";

export default function Photo() {
  const videoReference = useRef();
  const canvas = useRef(null);

  async function handleStartCamera() {
    if ("mediaDevices" in navigator) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoReference.current.srcObject = stream;
      });
    }
  }

  return (
    <section>
      <button id="start-camera" onClick={handleStartCamera}>
        Starta kameran
      </button>
      <button id="take-picture">Ta kort</button>
      <video src="" id="camera" autoPlay ref={videoReference}></video>
      <canvas id="picture" ref={canvas}></canvas>

      <section>
        <h3>Galleri</h3>
        <section id="gallery"></section>
      </section>
    </section>
  );
}
