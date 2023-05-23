const express = require("express");
const route = express.Router();

const { login, signUp } = require("../controller/authController");
route.post("/login", login);
route.post("/signUp", signUp);

module.exports = route;
