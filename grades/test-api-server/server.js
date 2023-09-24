// express can be a dev dependency because it is only used for testing
/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

// Generic function to read JSON file
async function readJsonFile(filename) {
  try {
    const data = await fs.promises.readFile(filename, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading/parsing JSON file:", err);
    return null;
  }
}

app.get("/matricula/user/:user/periodo/:periodo", async (req, res) => {
  const filename = process.argv[2];
  console.log(`reading from ${filename}`);

  const fakeData = await readJsonFile(filename);

  if (fakeData === null) {
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }

  res.status(200).json(fakeData.coursesResponse);
});
app.post("/notas-parciales", async (req, res) => {
  const { nrc } = req.body;
  const filename = process.argv[2];
  console.log(`reading from ${filename}`);

  const fakeData = await readJsonFile(filename);

  if (fakeData === null) {
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }

  res.status(200).json(fakeData.nrcResponse[nrc]);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
