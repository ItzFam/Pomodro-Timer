import { useState } from "react";

function App() {
  // Use useState to update text.
  const [note, newNote] = useState("");
  const [summary, newSummary] = useState(
    "Cooking up something to save your GPA..."
  );

  const handleSummary = async () => {
    const response = await fetch("http://localhost:3000/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: note }),
    });

    const data = await response.json();
    newSummary(data.summary);
  };

  return (
    <div>
      <h1>AI Summarizer</h1>
      <textarea
        value={note}
        onChange={(e) => newNote(e.target.value)}
        placeholder="Enter your note here..."
      />
      <button onClick={handleSummary}>Summarize</button>
      <p>{summary}</p>
    </div>
  );
}

export default App;
