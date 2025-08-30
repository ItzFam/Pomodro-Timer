import { useState } from "react";

function App() {
  const [text, newText] = useState("");

  return (
    <button
      onClick={() => {
        newText(text + "a");
        console.log(text);
      }}
    >
      Clicked and Changed
    </button>
  );
}

export default App;
