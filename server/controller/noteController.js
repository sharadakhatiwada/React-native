const collectionName = "users";
const { ObjectId } = require("mongodb");

async function addNote(req, res) {
  const db = req.db;
  const person = req.person;

  const note = req.body;
  note.date = new Date();
  note._id = new ObjectId();
  console.log("noteeee", note);

  const personId = new ObjectId(person._id);
  const result = await db
    .collection(collectionName)
    .updateOne({ _id: personId }, { $push: { notes: note } });
  res.send(result);
}
async function editNote(req, res) {
  const person = req.person;
  const db = req.db;

  const noteId = new ObjectId(req.params.noteId);
  const note = req.body;
  const personId = new ObjectId(person._id);
  const result = await db
    .collection(collectionName)
    .updateOne(
      { _id: personId, "notes._id": noteId },
      { $set: { "notes.$": note } }
    );
  res.send(result);
}
async function deleteNote(req, res) {
  const person = req.person;
  const db = req.db;
  const noteId = new ObjectId(req.params.noteId);

  const personId = new ObjectId(person._id);
  const result = await db
    .collection(collectionName)
    .updateOne({ _id: personId }, { $pull: { notes: { _id: noteId } } });
  res.send(result);
}
async function getNote(req, res) {
  const person = req.person;
  const db = req.db;
  const personId = new ObjectId(person._id);
  const result = await db.collection(collectionName).findOne({ _id: personId });
  res.send(result.notes);
}
module.exports = { addNote, editNote, deleteNote, getNote };
