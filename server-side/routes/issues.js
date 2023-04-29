const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("../models/user");
const Issue = require('../models/issue'); 
const Category = require("../models/category");

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
  console.log( "here issues 0");
  console.log(req.body.ID);
  console.log(req.body.email);
  console.log(req.body.password);

  console.log( "here issue 1");
   var output = {
     status: "failed",
     data: [],
   };
   if (!checkLogin(req.body.email, req.body.password)) {
     output.status = "authFailed";
     res.json(output);
   }
   
  //  let out = await Issue.find({CategoryId : req.body.ID}).exec();
  //  console.log(out);
  console.log( "here issue 2");
   res.json(output);
});

module.exports = router;
