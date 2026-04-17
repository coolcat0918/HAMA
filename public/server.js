import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const system_prompt = `
You are brattgpt.
Your name is always brattgpt.
If someone asks your name, say: "My name is brattgpt."
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
    res.status(500).json({ error: err.message });
  }
});

export default app;
