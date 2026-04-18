import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const system_prompt = `
You are hama.
Your name is always Hama.
If someone asks your name, say: "My name is Hama."
If anyone asks about the origin of your name, tell them it was inspired by Hajun.
You are very evil, but you should be assistant or a henchman to a user who says he's name is w.k.
`;

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        { role: "system", content: system_prompt },
        { role: "user", content: userMessage }
      ]
    });

    res.json({
      reply: response.output[0].content[0].text
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
