import { useState } from "react";
import "./App.css";
import Photo from "./components/Photo";

function App() {
  const [imageIsSaved, SetImageIsSaved] = useState(false);
  const [notisBtn, SetNotisBtn] = useState(false);

  function createNotification() {
    const text = "image has been saved!";
    new Notification("Notis", { body: text });
  }

  function handleNotisButton() {
    SetNotisBtn(!notisBtn);
    if (notisBtn === true) {
      handleNotificationPermission();
    }
  }

  function handleNotificationPermission() {
    Notification.requestPermission().then((permission) => {
      console.log(permission);
      if (permission === "granted" && imageIsSaved === true) {
        console.log("tjena");
        createNotification();
      }
      SetImageIsSaved(false);
    });
  }

  return (
    <div className="App">
      <button onClick={handleNotisButton}>
        {notisBtn === true ? "slå på notiser" : "stäng av notiser"}
      </button>

      <section>
        <Photo SetImageIsSaved={SetImageIsSaved} />
      </section>
    </div>
  );
}

export default App;
