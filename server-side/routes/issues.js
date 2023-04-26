const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const User = require("../models/user");
const Issue = require('../models/issue'); 

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
  const checkID = req.body.OrgId;
  console.log(checkID);
  var output = {
    status: "failed",
    data: [],
  };
  // if (!checkLogin(req.body.email, req.body.password)) {
  //   output.status = "authFailed";
  //   res.json(output);
  // }
  // let List = await Issue.find({ CategoryId: checkID }).catch(() => {
  //   res.json(output);
  // });
  // output.status = "success";
  // output.data = List;
  res.json(output);
});

module.exports = router;
