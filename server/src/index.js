const express = require("express");
const cors = require("cors");
const PORT = 3010;

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to SkySpecs!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
