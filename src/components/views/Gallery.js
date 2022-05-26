import { Link } from "react-router-dom";

import ImageElement from "../ImagesElement";

export default function Gallery({ setImages }) {
  let images = JSON.parse(localStorage.getItem("cameraApp"));
  console.log(images);

  return (
    <div>
      <Link to="/">
        <img src="logo.png" alt="nav" width="50px" />
      </Link>

      <section>
        <section id="gallery">
          {images.length > 0
            ? images.map((image, index) => {
                return (
                  <ImageElement
                    image={image.image}
                    images={images}
                    key={index}
                    setImages={setImages}
                  />
                );
              })
            : ""}
        </section>
      </section>
    </div>
  );
}
