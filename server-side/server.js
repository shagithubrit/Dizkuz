// imports
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

main().catch(err => console.log(err));


// connecting mongodb
async function main() {
    await mongoose.connect(
      "mongodb+srv://ishavishwakarma29:ishaDizkuz@cluster0.zwbubwl.mongodb.net/test"
      // "mongodb+srv://adityarai:aditya07@dizkuz.4tvbing.mongodb.net/test"
    );
    console.log("db connected");
}


// mongoose schemas
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


const CategorySchema = new mongoose.Schema({
  title : String,
  description: String,
  OrganisationId: String,
});

const IssueSchema = new mongoose.Schema({
  author : String,
  title : String,
  body : String,
  creationDate : String,
  CategoryId : String,
});


const MessageSchema = new mongoose.Schema({
  author : String,
  text : String,
  dateTime : String,
  authorID : String,
  IssueID : String
});


// mongoose models
const User = mongoose.model('User', UserSchema);
const Organisation = mongoose.model('Organisation', OrganisationSchema);
const Category = mongoose.model('Category', CategorySchema);
const Message = mongoose.model('Message', MessageSchema);
const Issue = mongoose.model( 'Issue', IssueSchema);

const server = express();

const checkLogin = async ( EMAIL, PASSWORD) => {
  let output = await User.findOne({email : EMAIL}).exec();

  if(output==null){
    return false;
  }
  if (output.password === PASSWORD) {
    return true;
  }
  return false;
};

// middlewares
server.use(cors());
server.use(bodyParser.json());


// user signup
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


// user login

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


// check if user with given user id exists

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


// new organisation

server.post("/newOrg", async (req, res) => {
  const NAME = req.body.name;
  const USERS = req.body.users;
  const curr = req.body.currUser;

  if( !checkLogin( req.body.email, req.body.password)){
    output.status = 'authFailed';
    res.json( output);
  }

  let org = new Organisation();
  org.name = NAME;
  org.users = USERS;
  const doc = await org.save();
  console.log(doc.id);
  User.findByIdAndUpdate(curr._id, {$push: {organisations : doc.id}}).exec();
  res.json(doc);
});

server.get("/newOrg", async (req, res) => {
  const docs = await organisation.find({});
  res.json(docs);
});



// leave organisation

server.post("/leaveOrg", async (req, res) => {
  const USERID = req.body.userId;
  const ORGID = req.body.organisationId;

  if( !checkLogin( req.body.email, req.body.password)){
    output.status = 'authFailed';
    res.json( output);
  }

  User.findByIdAndUpdate(USERID, { $pull: { organisations: ORGID } }).exec();
  let output = await User.findById(USERID).exec();
  res.json(output.organisations);
});

server.get("/leaveOrg", async (req, res) => {
  const docs = await Organisation.find({});
  res.json(docs);
});

// get all organisation 
server.get( '/organisations', async( req, res) => {
  var output = {
    status : 'failed',
    data : []
  };

  if( !checkLogin( req.body.email, req.body.password)){
    output.status = 'authFailed';
    res.json( output);
  }

  let List = req.body.organisations.map( async(orgID) => {
    return await Organisation.findById( orgID);
  }).catch(() => {
    res.json( output);
  })
  
  output.status = 'success';
  output.data = List;
  res.json( output);
});

// get all Issues
server.get( '/issues', async( req, res) => {
  const checkID = req.body.CategoryId;

  var output = {
    status : 'failed',
    data : []
  };

  if( !checkLogin( req.body.email, req.body.password)){
    output.status = 'authFailed';
    res.json( output);
  }

  let List = await Issue.find( { CategoryId : checkID} ).catch( () => {
    res.json( output);
  });

  output.status = 'success';
  output.data = List;
  res.json( output);
});

// get messages
server.get( '/chats', async( req, res) => {
  const checkID = req.body.issueID;
  const userID = req.body.userID;

  var output = {
    status : 'failed',
    data : []
  };

  if( !checkLogin( req.body.email, req.body.password)){
    output.status = 'authFailed';
    res.json( output);
  }

  let List = await Issue.find( { issueId : checkID} ).catch( () => {
    res.json( output);
  });

  let OutputList = List.map( (elt) => {
    if( userID == elt.authorID){
      return {...elt, userAuth : true};
    }else{
      return {...elt, userAuth : false};
    }
  });

  output.status = 'success';
  output.data = OutputList;
  res.json( output);
});


server.listen(8080, () => {
    console.log("server started");
});