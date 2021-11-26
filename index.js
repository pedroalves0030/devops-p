const express = require("express");
const prom = require("prom-client");

const app = express();

const { MongoClient } = require("mongodb");

const { PORT = 4000, MONGO_URI = "mongodb://mongo:27017" } = process.env;

const collectDefaultMetrics = prom.collectDefaultMetrics;
collectDefaultMetrics({});

const client = new MongoClient(MONGO_URI);

const dbName = "myFirstDatabase";

app.get("/", async (_req, res) => {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("documents");

  await collection.insertOne({ message: "ping" });

  res.sendStatus(200);
});

app.get("/metrics", express.text(), async (req, res) => {
  const metrics = await prom.register.metrics();
  res.end(metrics);
});

app.post("/alerts", express.json(), (req, res) => {
  console.log(req.body);

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`App started at port ${PORT}`);
});
