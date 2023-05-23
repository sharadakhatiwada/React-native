const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const mongodb = require("mongodb");
//var ObjectId = require("objectid");
const { MongoClient } = require("mongodb");
let uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const foods = require("./routes/food");
const notes = require("./routes/note");
const person = require("./routes/person");
const login = require("./routes/login");

async function main() {
  await client.connect();
  db = client.db("final-Project-reactNative");
}
main().then(() => {
  app.listen(3000, console.log("listening 0n port 3000"));

  app.use((req, res, next) => {
    req.db = db;
    next();
  });
  app.use("/", login);
  app.use("/foods", foods);
  app.use("/notes", notes);
  app.use("/person", person);
});
