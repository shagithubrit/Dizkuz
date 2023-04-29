const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  author: String,
  text: String,
  dateTime: String,
  authorID: String,
  userAuth: Boolean,
  IssueID: String,
});

module.exports = mongoose.model("Message", MessageSchema);
