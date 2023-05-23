const express = require("express");
const route = express.Router();
const {
  editPerson,
  getPerson,
  createPerson,
} = require("../controller/personController");
const { authorize } = require("../controller/authController");
route.get("/", authorize, getPerson);
route.put("/", authorize, editPerson);
module.exports = route;
