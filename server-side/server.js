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
});



const User = mongoose.model('User', UserSchema);

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
        userObject.email = output.password;
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

server.listen(8080, () => {
    console.log("server started");
})