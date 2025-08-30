import express from "express";
import OpenAI from "openai";
//import dotenv from "dotenv";

//dotenv.config({ path: path.resolve("./.env") }); // loads your API key from .env

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey:
    "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",
});

app.post("/api/summarize", async (req, res) => {
  try {
    const { text } = req.body;
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Summarize this: ${text}` }],
    });
    res.json({ summary: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
