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

poemsRouter.post("/", function (req, res) {
    
  if (!req.body || !req.body.title || !req.body.author || !req.body.text) {
    console.log(req.body);
    return res.status(400).send({ error: "Missing Fields" });
  }

  const maxId = poems.length > 0 ? Math.max(...poems.map((u) => u.id)) : 0;
  const poem = req.body;
  poem.id = maxId + 1;

  const newPoem = {
    id: poem.id,
    title: poem.title,
    author: poem.author,
    text: poem.text,
    votes: 0,
  };

  poems.push(newPoem);

  res.json(newPoem);
  
});

poemsRouter.post('/:id', (req,res) => {
    const id = Number(req.params.id);
    const poem = poems.find((poem) => poem.id === id);

    if (poem) {
        poem.votes++
        return res.json(poem)
    } else {
        res.status(404).json({ error: "Poem with ID not found" });
    }
})

module.exports = poemsRouter;
