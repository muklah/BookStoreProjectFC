// Dependency

const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pdf: {
      type: String,
      required: [true, 'PDF Is Required']
    },
    image: {
      type: String,
      required: [true, 'Image Is Required']
    },
    title: {
      type: String,
      required: [true, 'Title Is Required']
    },
    author: {
      type: String,
      required: [true, 'Author Is Required']
    },
    publishedDate: {
        type: String,
        default: new Date().toLocaleString(),
        required: true
      },
  
  });

module.exports = mongoose.model('Book', bookSchema);