// Dependencies
const express = require('express');
const app = express();
const Joi = require('joi');
const booksRoutes = require('./routes/books');
const usersRoutes = require('./routes/users');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 2000
var cors = require('cors');
const fileUpload = require('express-fileupload');

//  Starting MongoDB connection
mongoose.connect('mongodb://muklah:12345m@ds141704.mlab.com:41704/bookstore', { useNewUrlParser: true });

//  To Check if the connection works fine or not
mongoose.connection.on('connected', () => {
    console.log('\x1b[36m%s\x1b[0m', 'mongo has been connected...');
});

// MiddleWare
app.use(express.json());
// For serving images and other static data
// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
// console.log(__dirname + '/public');

app.use(cors({ origin: '*' }));

app.use(function (req, res, next) {

    // Website allows to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods allows
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers allows
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent to the API
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//  You have to use This MiddleWare to get the files
app.use(fileUpload());

// Route MiddleWare for any route that start with (/api/books)
app.use('/api/books', booksRoutes);
app.use('/api/users', usersRoutes);

// Starting the server
app.listen(PORT, () => {
    console.log('Running on port 2000');
});
