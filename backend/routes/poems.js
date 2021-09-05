const express = require("express");
const poemsRouter = express.Router();
const fs = require("fs");
const path = require("path");
const rawdata = fs.readFileSync(path.join(__dirname, "../poems.json"));
const initialPoems = JSON.parse(rawdata);
const Fuse = require("fuse.js");

let poems = initialPoems.poems;
const sortPoems = (passedArray) => {
  passedArray.sort((a, b) => {
    if (a.votes < b.votes) return 1;
    if (a.votes > b.votes) return -1;
    return 0;
  });
};

sortPoems(poems);

const checkHeader = (req, res, next) => {
  const authHeader = req.header("bob");
  if (authHeader === "Bobalooba") return next();
  return res.status(401).json({ error: "Unauthorized" });
};

poemsRouter.use(checkHeader);

poemsRouter.get("/", async function (req, res) {
  let page = req.query.page || 1;
  let limit = req.query.limit || 6;
  let search = req.query.search || "";

  if (search !== "") {
    const fuse = new Fuse(poems, {
      keys: ["author", "text", "title"],
      ignoreLocation: true,
      threshold: 0.3,
    });
    const result = await fuse.search(search);
    var poems2 = result.map((res) => res.item);
    sortPoems(poems2);
  }

  if (page) {
    const resultPoems = poems2 ? poems2 : poems;
    return res.json({
      totalPages: Math.ceil(resultPoems.length / limit),
      data: resultPoems.slice((page - 1) * limit, page * limit),
    });
  } else {
    return res.json(poems);
  }
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

  sortPoems(poems);

  res.json(newPoem);
});

poemsRouter.post("/:id", (req, res) => {
  const id = Number(req.params.id);
  const poem = poems.find((poem) => poem.id === id);

  if (poem) {
    poem.votes++;
    sortPoems(poems);
    return res.json(poem);
  } else {
    res.status(404).json({ error: "Poem with ID not found" });
  }
});

module.exports = poemsRouter;
