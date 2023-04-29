const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
let router = express.Router();
router.use(bodyParser.json());
router.use(cors());

const User = require("../models/user");
const Organisation = require("../models/organisation");
const Category = require("../models/category");
const Issue = require("../models/issue");
const message = require("../models/message");

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
  console.log("recieved ORGID : ", ORGID);
  var output = {
    status: "failed",
  };
  if (!checkLogin(req.body.email, req.body.password)) {
    output.status = "authFailed";
    res.json(output);
  }
  try {
    let currOrg = await Organisation.findById(ORGID).exec();
    console.log( "Organisation : ");
    console.log(currOrg.name);
    const MEMS = currOrg.users;
    let arr = [];
    console.log( "==Members");
    console.log( MEMS);
     for (let i = 0; i < MEMS.length; i++) {
       const currMem = await User.findById(MEMS[i]);
       console.log( "curMem : ", currMem);
       let membr = {
            name: currMem.name,
            email: currMem.email,
            _id: currMem._id
         }
        console.log( "membr : ", membr);
       arr.push(membr);
     }
     console.log( "arr : ", arr);
    const out = {
      status: "success",
      data: arr,
    };
    console.log( "output Members : ", out);
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
