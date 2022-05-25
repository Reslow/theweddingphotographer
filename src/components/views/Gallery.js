import ImageElement from "../ImagesElement";

export default function Gallery(images, setImages) {
  return (
    <div>
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
    </div>
  );
}
