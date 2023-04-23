const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  author: String,
  title: String,
  body: String,
  creationDate: String,
  CategoryId: String,
});

module.exportsc = mongoose.model("Issue", IssueSchema);
