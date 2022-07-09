const express = require("express");

const router = express.Router();

var multipart = require("connect-multiparty");
const path = require("path");
var multipartMiddleware = multipart({
  uploadDir: path.join(__dirname, "uploads"),
});

const {  DeleteFile,DownloadFile,uploadFile,getFileData}=require("../controller/Upload")

router.get("/file", getFileData);

router.post("/file",multipartMiddleware, uploadFile);

router.delete("/file/delete/:id", DeleteFile);

router.get("/download/:id", DownloadFile);
module.exports = router;
