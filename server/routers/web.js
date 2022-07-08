const express = require("express");

const router = express.Router();

var multipart = require("connect-multiparty");
const path = require("path");
var multipartMiddleware = multipart({
  uploadDir: path.join(__dirname, "uploads"),
});

const userController = require("../controller/userController");
const fileController = require("../controller/fileController");
router.post("/userReg", userController.userRegistration);
//in thunder : http://localhost:9013/userReg  ==> post

router.post("/login", userController.userLogin);
//in thunder : http://localhost:9013/login  ==> post

// file upload
router.get("/file", fileController.getFileData);
// in thunder : http://localhost:9013/Api  ==> get

router.post("/file", multipartMiddleware, fileController.uploadFile);
// in thunder : http://localhost:9013/Api  ==> post

router.delete("/file/delete/:id", fileController.DeleteFile);
// in thunder : http://localhost:9013/file/delete/62c866cace3d08a7f2d6ca73  ==> delete

router.get("/download/:id", fileController.DownloadFile);
module.exports = router;
