const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("../models/user");
const Organisation = require("../models/organisation");
const Issue = require("../models/issue");
const Message = require("../models/message");


let router = express.Router();
router.use(bodyParser.json());
router.use(cors());

const checkLogin = async (EMAIL, PASSWORD) => {
  let output = await User.findOne({ email: EMAIL }).exec();

  if (output == null) {
    return false;
  }
  if (output.password === PASSWORD) {
    return true;
  }
  return false;
};

router.post("/", async (req, res) => {
  const AuthName = req.body.name;
  const AuthId = req.body.User_id;
  const messageBody = req.body.body;
  const issueId = req.body.IssueID;
   var today = new Date().toLocaleDateString();
   
  let output = {
    status: "Failed",
    data: {},
  };

  if (!checkLogin(req.body.email, req.body.password)) {
    output.status = "authFailed";
    res.json(output);
  }

  let out = await Issue.findOne({ title: issueName });

  if (out == null) {
    try {
      let issue = new Issue();
      issue.author = UserName;
      issue.title = issueName;
      issue.body = DESCRIPT;
      issue.creationDate = today;
      issue.CategoryId = CATID;
      const doc = await issue.save();
      const out = {
        status: "success",
        data: doc,
      };
      res.json(out);
    } catch (error) {
      res.json(error);
    }
  } else {
    res.json(null);
  }
});

router.get("/", async (req, res) => {
  const docs = await Issue.find({});
  res.json(docs);
});

module.exports = router;
