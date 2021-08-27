const express = require("express");
const app = express();
const cors = require("cors");
const poemsRouter = require("./routes/poems");
const port = process.env.PORT || 3001;
const path = require('path')

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).send({ error: "Invalid JSON" });
  }
  next();
});

app.use("/api/poems", poemsRouter);

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.listen(port);
