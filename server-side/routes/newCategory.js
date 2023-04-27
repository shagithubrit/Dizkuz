const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("../models/user");
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
  const docs = await User.find({});
  res.json(docs);
});


router.post("/", async (req, res) => {
  const Name = req.body.NAME;
  const id = req.body.ID;
  if (!checkLogin(req.body.email, req.body.password)) {
    output.status = "authFailed";
    res.json(output);
  }
    let output = await Category.findOne({ name: Name }).exec();
    if (output === null) {
      let category = new Category();
      category.name = Name;
      category.OrganisationId = id;
      const doc = await category.save();
      console.log(doc);
      res.json(doc);
    } else {
      res.json(null);
    }
});

module.exports = router;
