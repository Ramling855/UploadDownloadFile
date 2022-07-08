const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  file: { type: String, required: true, trim: true },
});

const cvModel = mongoose.model("file_upload", cvSchema);

module.exports = cvModel;
