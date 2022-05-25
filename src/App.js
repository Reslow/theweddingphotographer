import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Gallery from "./components/views/Gallery";
import Home from "./components/views/Home";

function App() {
  const [imageIsSaved, SetImageIsSaved] = useState(false);
  const [notisBtn, SetNotisBtn] = useState(true);
  const [permission, SetPermission] = useState(false);

  function createNotification() {
    const text = "image has been saved!";
    new Notification("Notis", { body: text });
  }

  function handleNotisButton() {
    SetNotisBtn(!notisBtn);
    console.log(notisBtn);
    if (notisBtn === true) {
      console.log("btn");
      handleNotificationPermission();
    }
  }

  function handleNotificationPermission() {
    Notification.requestPermission().then((permission) => {
      console.log(permission);
      if (permission === "granted") {
        SetPermission(true);
      }
    });
  }

  return (
    <div className="App">
      <button onClick={handleNotisButton}>
        {notisBtn === true ? "slå på notiser" : "stäng av notiser"}
      </button>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              imageIsSaved={imageIsSaved}
              SetImageIsSaved={SetImageIsSaved}
              permission={permission}
              createNotification={createNotification}
            />
          }
        ></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
      </Routes>
    </div>
  );
}

export default App;
