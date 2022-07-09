const userModel = require("../models/user");
const { passwordCompare, jwtGen } = require("../utils/utils");
const signup = (req, res) => {
//   console.log(req.body);

//   console.log("file path",req.files.file.path);
//   var imageFile = req.files.file.path;
// //   const newData = new userModel({
//     file: imageFile,
//   });
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    
  });

  user
    .save()
    .then((data) => {
      res.json({
        message: "Successfully registered",
      });
    })
    .catch((err) => {
      res.json({
        message: "User already registered",
      });
    });
};

const login = (req, res) => {
 console.log(req.body);

  userModel.findOne({ email: req.body.email })
    .then((result) => {
      console.log(result,"resssssss")
      //we have to compare the passwords
      passwordCompare(result.password, req.body.password).then((data) => {
        //console.log("dbpassword",result.password)
        //console.log("entered password",req.body.password)
        if (result) {
          jwtGen({result })
            .then((token) => {
              console.log("token",token)
              res.json({
                message: "Login Success",
                token: token,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          res.json({
            message: "Login Failed",
          });
        }
      });
    })
    .catch((err) => {
      res.json({
        message: "No user found !!",
      });
    });
};

//By neha
const getUserData = async (req, res) => {
  console.log("get user data email:", req.params.id);
  try {
    const List = await userModel.findOne({ email: req.params.id });
    console.log(List);
    // res.send(List);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  signup,
  login,
  getUserData,
};