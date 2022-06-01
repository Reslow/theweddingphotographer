import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Gallery from "./components/views/Gallery";
import Home from "./components/views/Home";
import Intro from "./components/Intro";
import Error from "./components/views/Error";

function App() {
  const [imageIsSaved, SetImageIsSaved] = useState(false);
  const [hideApp, setHideApp] = useState(false);
  const [notisBtn, SetNotisBtn] = useState(true);
  const [permission, SetPermission] = useState(false);
  const [itemsInJSONBin, setItemsInJSONBin] = useState([]);
  const [startValues, setStartValues] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [images, setImages] = useState(startValues);
  let itemsInLocalstorage = JSON.parse(localStorage.getItem("cameraApp"));

  const API_KEY_JSON_BIN =
    "$2b$10$x2BMUJLMX7kIpkqMhEdg6e/ElCz1IilxZteD2TusAeiSUaItebbE2";

  async function getSavedImages() {
    const response = await fetch(
      "https://api.jsonbin.io/b/629485ad402a5b3802145bed",
      {
        headers: {
          "X-Master-Key": API_KEY_JSON_BIN,
        },
      }
    );

    const data = await response.json();
    setItemsInJSONBin(data.images);
    return data;
  }

  async function updateSavedImages() {
    let imgs = await getSavedImages();
    imgs.images.push(currentImage);

    const response = await fetch(
      "https://api.jsonbin.io/b/629485ad402a5b3802145bed",
      {
        method: "PUT",
        body: JSON.stringify({ images: imgs }),
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY_JSON_BIN,
        },
      }
    );

    const data = await response.json();
    setItemsInJSONBin(data);
  }

  async function updatearr(mergeResult) {
    const response = await fetch(
      "https://api.jsonbin.io/b/629485ad402a5b3802145bed",
      {
        method: "PUT",
        body: JSON.stringify({ images: mergeResult }),
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY_JSON_BIN,
        },
      }
    );
    const data = await response.json();
    setImages(data.data.images);
  }

  function createNotification(text) {
    new Notification("Notis", { body: text });
  }

  function handleNotisButton() {
    SetNotisBtn(!notisBtn);
    if (notisBtn === true) {
      handleNotificationPermission();
    } else {
      // I could not find a way to adjust permission but  in this way user wont get any notification when button is on off.
      SetPermission(false);
    }
  }

  function handleNotificationPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        SetPermission(true);
      }
    });
  }

  // set true after 3 min
  useEffect(() => {
    if (navigator.onLine) {
      if (itemsInJSONBin && itemsInLocalstorage) {
        const mergeResult = [...itemsInJSONBin, ...itemsInLocalstorage];
        updatearr(mergeResult);
      } else {
        setStartValues(itemsInJSONBin);
      }
    } else {
      setStartValues(itemsInLocalstorage);
    }
    setInterval(() => {
      setHideApp(true);
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {navigator.onLine && (
        <div className="App_">
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
                    updateSavedImages={updateSavedImages}
                    currentImage={currentImage}
                    setCurrentImage={setCurrentImage}
                  />
                }
              ></Route>
              <Route
                path="/gallery"
                element={<Gallery setImages={setImages} images={images} />}
              ></Route>
              <Route path="*" element={<Error />}></Route>
            </Routes>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
