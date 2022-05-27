import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Gallery from "./components/views/Gallery";
import Home from "./components/views/Home";
import Intro from "./components/Intro";

function App() {
  const [imageIsSaved, SetImageIsSaved] = useState(false);
  const [hideApp, setHideApp] = useState(false);
  const [notisBtn, SetNotisBtn] = useState(true);
  const [permission, SetPermission] = useState(false);
  let itemsInLocalstorage = JSON.parse(localStorage.getItem("cameraApp"));
  const [images, setImages] = useState(
    itemsInLocalstorage?.length > 0 ? itemsInLocalstorage : []
  );
  console.log(images);

  function createNotification() {
    const text = "image has been saved!";
    new Notification("Notis", { body: text });
  }

  function handleNotisButton() {
    SetNotisBtn(!notisBtn);

    if (notisBtn === true) {
      console.log("btn");
      handleNotificationPermission();
    }
  }

  function handleNotificationPermission() {
    Notification.requestPermission().then((permission) => {
      // console.log(permission);
      if (permission === "granted") {
        SetPermission(true);
      }
    });
  }

  // set true after 3 min
  useEffect(() => {
    setInterval(() => {
      setHideApp(true);
    }, 3000);
  }, []);

  return (
    <div className="App">
      <header className="header">
        <button
          onClick={handleNotisButton}
          className={notisBtn ? "notis--btn--on" : "notis--btn--off"}
        >
          {notisBtn === true ? "slå på notiser" : "stäng av notiser"}
        </button>
      </header>
      {!hideApp ? (
        <Intro />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Home
                imageIsSaved={imageIsSaved}
                SetImageIsSaved={SetImageIsSaved}
                permission={permission}
                createNotification={createNotification}
                images={images}
                setImages={setImages}
              />
            }
          ></Route>
          <Route
            path="/gallery"
            element={<Gallery setImages={setImages} />}
          ></Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
