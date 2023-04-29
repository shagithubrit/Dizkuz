const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("../models/user");
const Organisation = require("../models/organisation");
const Category = require("../models/category");
const Issue = require("../models/issue");
const message = require("../models/message");

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
  const ORGID = req.body.ID;
  console.log(ORGID);
  var output = {
    status: "failed",
  };
  if (!checkLogin(req.body.email, req.body.password)) {
    output.status = "authFailed";
    res.json(output);
  }
  try {
    const currOrg = Organisation.findById(ORGID);
    // console.log(currOrg);
    const out = {
      status: "success",
      data: currOrgMembers,
    };
    res.json(out);
  } catch (error) {
    output.status = "failed";
    res.json(output);
  }
});

router.get("/", async (req, res) => {
  const docs = await Organisation.find({});
  res.json(docs);
});

module.exports = router;
