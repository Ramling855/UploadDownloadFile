const userModel = require("../models/fileModel");


 const uploadFile =(req, res)=> {
     console.log("file path",req.files.file.path);
    var imageFile = req.files.file.path;
    const newData = new userModel({
        email:req.body.email,
      file: imageFile,
    });
    newData.save()
    // .then(()=>console.log("data saved")).catch((err)=>console.log(err))
    res.send(imageFile);
  };

  //get controller
 const getFileData=async (req, res) => {
console.log(req.query.email)
    try {
      let data = await userModel.find({email:req.query.email});
      res.send(data);
    } catch (err) {
      console.log(err);
    }
  };

  // edit data
 const DeleteFile =async (req, res) => {
    console.log(req.params.id);
    try {
      let result = await userModel.deleteOne({ _id: req.params.id });
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  };

  // download File
 const DownloadFile =async(req, res) => {
    try {
      let result = await userModel.findOne({ _id: req.params.id });
      res.download(result.file);
    } catch (err) {
      console.log(err);
    }
  };

module.exports={
    DeleteFile,DownloadFile,uploadFile,getFileData
}