import { useState } from "react";
import { Link } from "react-router-dom";
import Photo from "../views/Photo";

export default function Home({
  permission,
  createNotification,
  setCaptured,
  images,
  setImages,
}) {
  const [imageIsSaved, SetImageIsSaved] = useState(false);

  return (
    <div>
      <Link to="/gallery" className="nav">
        <img src="/gallery.svg" alt="nav" />
      </Link>
      <Photo
        SetImageIsSaved={SetImageIsSaved}
        ImageIsSaved={imageIsSaved}
        permission={permission}
        createNotification={createNotification}
        setCaptured={setCaptured}
        images={images}
        setImages={setImages}
      />
    </div>
  );
}
