// imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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
    if(output===null)
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
});

server.get("/signUp", async(req, res) => {
    const docs = await User.find({});
    res.json(docs);
});

// user login
server.post("/login", async (req, res) => {
  const EMAIL = req.body.email;
  const PASSWORD = req.body.password;
//   find users with the entered email in database
    let output = await User.findOne({email : EMAIL}).exec();
    console.log( "user output");
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
    if(output === null){
      userObject.status = 'notFound';
    }
    else{
      if (output.password === PASSWORD) {
        userObject.status = 'matched';
        userObject.name = output.name;
        userObject.password = output.password;
        userObject.email = output.email;
        userObject.organisations = output.organisations;
        userObject.messages = output.messages;
        userObject._id = output._id;
        userObject.__v = output.__v;
      }
      else{
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
  
  let IdExists = false;
  // User.exists({ _id: id }).then(exists => {
  //   if (exists) {
  //     IdExists = true;
  //   }
  // });
  let output = await User.findOne({ _id : id}).exec();

  if( output != null){
    IdExists = true;
  }

  if ( IdExists) {
    const out = {
      status: "Found",
    };
    res.json(out);
  } else {
    const out = {
      status : "notFound",
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
  const NAME = req.body.OrgName;
  const EMAIL = req.body.email;
  const USERS = req.body.users;
  const PASSWORD = req.body.password;
  const curr = req.body.name;
  const curr_id = req.body.User_id;

  USERS.push( curr_id);

  let output = {
    status : 'Failed',
    data : {}
  }

  if( !checkLogin( req.body.email, req.body.password)){
    output.status = 'authFailed';
    res.json( output);
  }
  let org = new Organisation();
  org.name = NAME;
  org.users = USERS;
  const doc = await org.save();
  for( let i = 0; i < USERS.length; i++){
    User.findByIdAndUpdate( USERS[ i], {$push: {organisations : doc.id}}).exec();
  }

  let UserData = await User.findOne({email : EMAIL}).exec();
  let userObject = {
    _id : "",
    name : "",
    password : "",
    email : "",
    __v : "",
    status : "",
    organisations : [],
    messages : 0
  }
  if( UserData === null){
    userObject.status = 'Failed';
  }
  else{
    if ( UserData.password === PASSWORD) {
      userObject.status = 'Success';
      userObject.name = UserData.name;
      userObject.password = UserData.password;
      userObject.email = UserData.email;
      userObject.organisations = UserData.organisations;
      userObject.messages = UserData.messages;
      userObject._id = UserData._id;
      userObject.__v = UserData.__v;
    }
    else{
      userObject.status = 'Failed';
    }
  }
  res.json(userObject);
});

server.get("/newOrg", async (req, res) => {
  const docs = await organisation.find({});
  res.json(docs);
});

// leave organisation
server.post("/leaveOrg", async (req, res) => {
  const USERID = req.body.userId;
  const ORGID = req.body.organisationId;
  console.log(USERID);
  console.log(ORGID);
  if( !checkLogin( req.body.email, req.body.password)){
    output.status = 'authFailed';
    res.json( output);
  }
  try {
    User.findByIdAndUpdate(USERID, { $pull: { organisations: ORGID } }).exec();
  } catch (error) {
    const status = {
      process: "Failed"
    }

    res.json(status);
  }

  try {
    Organisation.findByIdAndUpdate(ORGID, { $pull: { users: USERID } }).exec();
  } catch (error) {
    const status = {
      process: "Failed",
    };
    res.json(status);
  }
  let output = await User.findById(USERID).exec();
  const status = {
    process: "success",
    user: output
  }
  res.json(status);
});

server.get("/leaveOrg", async (req, res) => {
  const docs = await Organisation.find({});
  res.json(docs);
});

// get all organisation 
server.post( '/organisations', ( req, res) => {
  var output = {
    status : 'failed',
    data : []
  };
  if( !checkLogin( req.body.email, req.body.password)){
    output.status = 'authFailed';
    res.json( output);
  }
  let List = [];

  const getList = async() => {
    const OrgIDs = req.body.organisations;
    console.log( OrgIDs);
    for( let i = 0; i < OrgIDs.length; i++){
      const ListElt = await Organisation.findById( OrgIDs[ i]);
      List.push( ListElt);
    }
  }
  
  getList().then(() => {
    output.status = 'success';
    output.data = List;
    console.log( "hello");
    console.log( output.data);
    res.json( output);
  });
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


// starting server
server.listen(8080, () => {
    console.log("server started");
});