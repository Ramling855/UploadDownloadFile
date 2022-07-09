const express = require("express");

const authrouter = express.Router();
var multipart = require("connect-multiparty");
const path = require("path");
var multipartMiddleware = multipart({
  uploadDir: path.join(__dirname, "uploads"),
});


const {
  signup,
  login,
  getUserData,
} = require("../controller/auth");
const { encryptPassword } = require("../middleware/Encryptpass");

authrouter.post("/signup", encryptPassword, signup);
authrouter.post("/login", login);
//By neha
authrouter.get("/userdata/:id", getUserData);
module.exports = authrouter;