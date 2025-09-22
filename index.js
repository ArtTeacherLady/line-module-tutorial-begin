// index.js
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY, // This reads your key from Render
});

app.post("/chat", async (req, res) => {
  const { userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const response = await openai.responses.create({
      model: "gemini-1.5-flash",
      input: userMessage,
    });

    const text =
      response.output[0]?.content[0]?.text ||
      "Sorry, I couldn't generate a response.";

    res.status(200).json({ reply: text });
  } catch (err) {
    console.error("Chat API error:", err);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
