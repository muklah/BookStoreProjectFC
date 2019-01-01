// Dependencies
const express = require('express');
var app= express();
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const Book = require('../models/book');
const uuidv1 = require('uuidv1');
const path = require('path');

// Getting all books
router.get('/books', (req, res) => {
  Book.find()
    .then(result => {
      res.send(result);
    }).catch(err => {
      res.status(400).send(err)
    })
})

// Adding a new Book
router.post('/add', (req, res) => {
  // Setting Schema so i can validate it
  const validating = bookValidating(req.body);
  if (validating.error) {
    res.status(400).send(validating.error.details);
  } else {
    let pdf = req.files.pdf;
    let image = req.files.image;
    
    pdfName = uuidv1();
    imageName = uuidv1();
    const book = new Book({
      _id: new mongoose.Types.ObjectId(),
      pdf: pdfName,
      image: "http://172.104.149.151:2000/images/"+imageName+".png",
      title: req.body.title,
      author: req.body.author
    });
    //  Checking the Mongoose Schema Validating
    const v = book.validateSync();
    // console.log(v);
    
    // If the validateSync returns any string, that means that there is somthing wrong in saving the data
    if (v)
      res.status(400).send('There is somthing wrong');
    //  IF the above if didn't wokred then the program can contiue to the below lines
    book.save()
      .then(result => {
        //  IF the book saved in the database
        res.send('You have added a new book');
        pdf.mv(`./public/pdfs/${pdfName}.pdf`, function(err) {
          if (err)
            return res.status(500).send(err);
            // res.send('PDF Uploaded!');
        });
        image.mv(`./public/images/${imageName}.png`, function(err) {
          if (err)
            return res.status(500).send(err);
          // res.send('Image uploaded!');
        });
        console.log(result);
      })
      .catch(err => {
        //  IF the book hasn't saved in the database

        res.status(401).send(err);
        console.log(err);
      });
  }
});

router.get('/download/:id', function(req, res){
  pdfName = req.params.id;
  console.log(pdfName);
  var file = `./public/pdfs/${pdfName}.pdf`;
  res.download(file);
  console.log(__dirname);
});

// PUT to edit book
router.put('/:id', (req, res) => {
  // If req.body is valid
  const validating = bookValidating(req.body);
  //  If the validation fails
  if (validating.error) {
    res.status(400).send(validating.error.details);
  } else {
    //  You can use updateMany
    Book.updateOne({ _id: req.params.id }, { $set: req.body })
      .then(result => {
        res.send(`Number of updated books is ${result.n}`);
      }).catch(err => {
        res.status(400).send(err);
      });
  }
});

// Deleting a book
router.delete('/:id', (req, res) => {
  Book.remove({ _id: req.params.id }).then(result => {
    res.send(`Number of deleted books is ${result.n}`)
  }).catch(err => {
    res.status(400).send(err);
  });
});

//  To validate the POST PUT requestes
function bookValidating(book) {
  const bookSchema = {
    'pdf': Joi.string(),
    'image': Joi.string(),
    'title': Joi.string().required(), 
    'author': Joi.string().min(5).required()
  }
  return Joi.validate(book, bookSchema);
}

//  Expoting the router so app.js can use it in a MiddleWare
module.exports = router;