const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3320;

app.use(express.static(path.join(__dirname)));

app.get("/api/gemini", async (req, res) => {
  const userInput = req.query.text;

  if (!userInput) {
    return res.status(400).send("Error: 'text' query parameter is required.");
  }

  const apiUrl = `https://genini-mu.vercel.app/api/gemini-text?text=${encodeURIComponent(userInput)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.success) {
      return res.json({ result: data.result });
    } else {
      return res.status(500).json({ error: "Failed to get valid response from Gemini API." });
    }
  } catch (error) {
    console.error("Error fetching Gemini API:", error);
    return res.status(500).json({ error: "Failed to fetch response." });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
