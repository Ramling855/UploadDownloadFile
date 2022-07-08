const fileModel = require("../models/fileModel");

class FileController {
  static uploadFile = async (req, res) => {
    // console.log("file path", req.files.file.path);
    var imageFile = req.files.file.path;
    const newData = new fileModel({
      file: imageFile,
    });
    newData.save();
    res.send(imageFile);
  };

  //get controller
  static getFileData = async (req, res) => {
    try {
      let data = await fileModel.find();
      res.send(data);
    } catch (err) {
      console.log(err);
    }
  };

  // edit data
  static DeleteFile = async (req, res) => {
    console.log(req.params.id);
    try {
      let result = await fileModel.deleteOne({ _id: req.params.id });
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  };

  // download File
  static DownloadFile = async (req, res) => {
    try {
      let result = await fileModel.findOne({ _id: req.params.id });
      res.send(result.file);
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = FileController;
