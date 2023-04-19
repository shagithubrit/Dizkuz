const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(
      "mongodb+srv://ishavishwakarma29:ishaDizkuz@cluster0.zwbubwl.mongodb.net/test"
      // "mongodb+srv://adityarai:aditya07@dizkuz.4tvbing.mongodb.net/test"
    );
    console.log("db connected");
}

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    organisations: [String]
});


const OrganisationSchema = new mongoose.Schema({
    users: [String],
    name: String,
});


const User = mongoose.model('User', UserSchema);

const Organisation = mongoose.model('Organisation', OrganisationSchema);

const server = express();

server.use(cors());
server.use(bodyParser.json());


server.post("/signUp", async(req, res) => {

    const EMAIL = req.body.email;
    let output = await User.findOne({ email: EMAIL }).exec();
    if(output==null)
    {
      let user = new User();
      user.name = req.body.name;
      user.password = req.body.password;
      user.email = req.body.email;
      const doc = await user.save();
      console.log(doc);
      res.json(doc);
    }
    else
    {
      res.json(null);
    }
})

server.get("/signUp", async(req, res) => {
    const docs = await User.find({});
    res.json(docs);
})

server.post("/login", async (req, res) => {
  const EMAIL = req.body.email;
  const PASSWORD = req.body.password;
//   find users with the entered email in database

    let output = await User.findOne({email : EMAIL}).exec();

    console.log( output);

    const userObject = {
      _id : "",
      name : "",
      password : "",
      email : "",
      __v : "",
      status : "",
      organisations : [],
      messages : 0
    }

    if(output==null)
    {
      userObject.status = 'notfound';
    }
    else
    {
      if (output.password === PASSWORD) 
      {
        userObject.status = 'matched';
        userObject.name = output.name;
        userObject.password = output.password;
        userObject.email = output.email;
        // userObject.organisations = output.organisations;
        // userObject.messages = output.messages;
        userObject._id = output._id;
        userObject.__v = output.__v;
      }
      else
      {
        userObject.status = 'notMatched';
      }
    }
    res.json(userObject);
});

server.get("/login", async (req, res) => {
  const docs = await User.find({});
  res.json(docs);
});


server.post("/checkuserid", async (req, res) => {
  const id = req.body.userID;
  console.log(id);
  let output = await User.findById(id).exec();

  console.log(output);

  if (output === null) {
    const out = {
      status : "not Found",
    };
    res.json(out);
  } else {
    const out = {
      status: "Found",
    };

    res.json(out);
  }
});


server.get("/checkuserid", async (req, res) => {
  const docs = await User.find({});
  res.json(docs);
});


server.post("/newOrg", async (req, res) => {
  const NAME = req.body.name;
  const USERS = req.body.users;

  let org = new Organisation();
  org.name = NAME;
  org.users = USERS;
  const doc = await org.save();
  console.log(doc);
  res.json(doc);
  
});

server.get("/newOrg", async (req, res) => {
  const docs = await organisation.find({});
  res.json(docs);
});




server.listen(8080, () => {
    console.log("server started");
})