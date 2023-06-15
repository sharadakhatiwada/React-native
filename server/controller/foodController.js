const { ObjectId } = require("mongodb");

const collectionName = "users";
async function addFood(req, res) {
  const person = req.person;
  const db = req.db;
  const food = req.body;
  console.log(food);
  food.createdDate = new Date();
  food._id = new ObjectId();
  const id = new ObjectId(person._id);
  const result = await db
    .collection(collectionName)
    .updateOne({ _id: id }, { $push: { foods: food } });
  res.send(result);
}

async function editFood(req, res) {
  const person = req.person;
  const db = req.db;
  const foodId = new ObjectId(req.params.foodId);
  const food = req.body;
  food._id = foodId;
  console.log(food);
  food.updatedDate = new Date();
  const id = new ObjectId(person._id);
  const result = await db
    .collection(collectionName)
    .updateOne({ _id: id, "foods._id": foodId }, { $set: { "foods.$": food } });
  res.send(result);
}
//6470d51c4d66aba0dd5ae677
async function deleteFood(req, res) {
  const person = req.person;
  const db = req.db;
  const foodId = new ObjectId(req.params.foodId);
  console.log(foodId);
  const id = new ObjectId(person._id);
  console.log(id);
  const result = await db
    .collection(collectionName)
    .updateOne({ _id: id }, { $pull: { foods: { _id: foodId } } });
  res.send(result);
}

async function getFood(req, res) {
  const person = req.person;
  const db = req.db;

  const id = new ObjectId(person._id);
  const result = await db.collection(collectionName).findOne({ _id: id });
  res.send(result.foods);
}
module.exports = { addFood, editFood, deleteFood, getFood };
