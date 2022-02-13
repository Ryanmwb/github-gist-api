const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Client } = require("pg");

require("dotenv").config();

const PORT = 3010;

const client = new Client({
  connectionString: process.env.DB_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect().then(() => console.log("connected to DB"));

const app = express();
app.use(bodyParser());
app.use(cors());

app.get("/favorite-gists", async (req, res) => {
  const response = await client.query('SELECT * FROM "favorites";');
  return res.status(200).json(response);
});

app.delete("/remove-favorite/:gist_id", async (req, res) => {
  const { gist_id } = req.params;

  await client.query(`
    DELETE FROM favorites
    WHERE gist_id='${gist_id}';
  `);
  const response = await client.query('SELECT * FROM "favorites";');

  return res.status(200).json(response);
});

app.post("/add-favorite", async (req, res) => {
  const { gist } = req.body;

  await client.query(
    `INSERT INTO favorites(gist_id, gist_obj)
    VALUES('${gist.id}', '${JSON.stringify(gist)}')
    RETURNING *;`
  );
  const response = await client.query('SELECT * FROM "favorites";');

  return res.status(200).json(response);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
