const express = require("express");
const poemsRouter = express.Router();
const fs = require("fs");
const path = require("path");
const rawdata = fs.readFileSync(path.join(__dirname, "../poems.json"));
const initialPoems = JSON.parse(rawdata);

let poems = initialPoems.poems;

poemsRouter.get("/", function (req, res) {
  res.json(poems);
});

poemsRouter.get("/:id", function (req, res) {
  const id = Number(req.params.id);
  const poem = poems.find((poem) => poem.id === id);
  if (poem) {
    res.json(poem);
  } else {
    res.status(404).json({ error: "Poem with ID not found" });
  }
});

module.exports = poemsRouter;
