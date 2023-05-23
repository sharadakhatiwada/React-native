const { ObjectId } = require("mongodb");
const collectionName = "users";
const bcrypt = require("bcrypt");

async function editPerson(req, res) {
  const person = req.person;
  const db = req.db;
  const personDetails = req.body.person;
  delete personDetails._id;
  if (personDetails.password) {
    personDetails.password = await bcrypt.hash(personDetails.password, 10);
  }

  const id = new ObjectId(person._id);
  const result = await db
    .collection(collectionName)
    .updateOne({ _id: id }, { $set: personDetails });
  res.send(result);
}

async function getPerson(req, res) {
  const person = req.person;
  const db = req.db;
  const id = new ObjectId(person._id);
  const result = await db
    .collection(collectionName)
    .findOne({ _id: id })
    .toArray();
  res.send(result);
}
module.exports = { editPerson, getPerson };
