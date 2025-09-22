import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY, // set in Render Dashboard
});

app.post("/chat", async (req, res) => {
  try {
    const { userMessage } = req.body;

    const response = await openai.responses.create({
      model: "gemini-1.5-flash",
      input: userMessage,
    });

    const text =
      response.output[0]?.content[0]?.text ||
      "Sorry, I couldn't generate a response.";

    res.json({ reply: text });
  } catch (err) {
    console.error("Chat API error:", err);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
