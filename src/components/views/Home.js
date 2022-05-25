import { useState, useEffect } from "react";
import Intro from "../Intro";
import Photo from "../views/Photo";

export default function Home({ permission, createNotification, setCaptured }) {
  const [showApp, setShowApp] = useState(false);
  const [imageIsSaved, SetImageIsSaved] = useState(false);

  // set true after 3 min
  useEffect(() => {
    setInterval(() => {
      setShowApp(true);
    }, 3000);
  }, []);
  console.log(showApp);

  return (
    <div>
      {showApp ? (
        <Photo
          SetImageIsSaved={SetImageIsSaved}
          ImageIsSaved={imageIsSaved}
          permission={permission}
          createNotification={createNotification}
          setCaptured={setCaptured}
        />
      ) : (
        <Intro />
      )}
    </div>
  );
}
