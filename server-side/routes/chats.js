const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const User = require("../models/user");
const Organisation = require("../models/organisation");
const Message = require("../models/message");
const Issue = require("../models/issue");


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

router.get("/", async (req, res) => {
  const checkID = req.body.issueID;
  const userID = req.body.userID;
  var output = {
    status: "failed",
    data: [],
  };
  if (!checkLogin(req.body.email, req.body.password)) {
    output.status = "authFailed";
    res.json(output);
  }
  let List = await Issue.find({ issueId: checkID }).catch(() => {
    res.json(output);
  });
  let OutputList = List.map((elt) => {
    if (userID == elt.authorID) {
      return { ...elt, userAuth: true };
    } else {
      return { ...elt, userAuth: false };
    }
  });
  output.status = "success";
  output.data = OutputList;
  res.json(output);
});

module.exports = router;
