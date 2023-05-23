const express = require("express");
const route = express.Router();
const {
  addNote,
  editNote,
  deleteNote,
  getNote,
} = require("../controller/noteController");
const { authorize } = require("../controller/authController");
route.get("/", authorize, getNote);
route.post("/", authorize, addNote);
route.put("/:noteId", authorize, editNote);
route.delete("/:noteId", authorize, deleteNote);
module.exports = route;
