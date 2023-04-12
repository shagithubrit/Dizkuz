const express = require( 'express'); // for express app
const morgan = require( 'morgan');  // for morgan => just tells the status of requests
const mongoose = require( 'mongoose'); // mongoose for quering the database
var cors = require('cors'); // cors will be used while deploying the site

const DatabaseURI = 'mongodb+srv://adityarai:aditya07@dizkuz.4tvbing.mongodb.net/?retryWrites=true&w=majority';

const app = express();

// Connecting to Database.
mongoose.connect( DatabaseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then((result) => {
        console.log( "Connected to Database.");
        app.listen( 3000); // We want the app to start listening only after the connection to Database is established.
    })
    .catch((err) => {
        console.log( err);
    });

app.use( cors());