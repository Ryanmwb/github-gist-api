const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const PORT = 3010;

const app = express();
app.use(cors());

// TODO: create db and persist favorites
app.get("/favorite-gists", async (req, res) => {
  return res.status(200).json({ hello, 'world!' });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
