const express = require("express");
const route = express.Router();
const {
  addFood,
  editFood,
  deleteFood,
  getFood,
} = require("../controller/foodController");
const { authorize } = require("../controller/authController");
route.get("/", authorize, getFood);
route.post("/", authorize, addFood);
route.put("/:foodId", authorize, editFood);
route.delete("/:foodId", authorize, deleteFood);
module.exports = route;
