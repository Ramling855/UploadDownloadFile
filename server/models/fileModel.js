const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({

  email:{type:String},
  file: { type: String, required: true, trim: true },
});

module.exports = mongoose.model("upload", newSchema);

 
