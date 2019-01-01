// Dependencies
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//  Regastiration a new user
router.post('/register', (req, res) => {
  //  VALIDATION
  // User.findOne({ email: req.body.email })
  //   .then(result => {
  //     if(result == 0){
      bcrypt.genSalt(10).then(salt => {
        bcrypt.hash(req.body.password, salt).then(hashed => {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hashed,
            type: 'user'
          });
          user.save().then(result => {
            const token = jwt.sign({ _id: result._id, exp: Date.now() + 1000 * 60 * 60 * 24 * 365 }, 'key');
            const email = result.email;
            const type = result.type;
            res.header({ 'x-auth-token': token, 'email': email, 'type': type }).json({
              'success': 'New user has been added',
              'x-auth-token': token,
              'email': email,
              'type': type
            })
          }).catch(err => {
            res.send(err);
          })
        })
      });
    // }
    // }).catch(err => {
    //   res.status(404).send('this email is already exist');
    // });
});

// Done
router.post('/checklogin', (req, res) => {
  //  check if there is a token
  const token = req.headers.token;
  if (token) {
    //  decode the token and chekc if it's validate
    try {
      //  Get the payload from the jsonwebtoken
      jwt.verify(token, 'key');
      //  You can check the expiration if you want
      res.send('you are logged in');
    } catch (err) {
      res.status(400).send('invalid token you have to login');
    }
  } else {
    res.send('you need to login');
  }
});

router.post('/login', (req, res) => {
  //  check if there is a user data (username & password) in the req body
  const validating = authValidating(req.body);
  if (validating.error) {
    res.status(400).send(validating.error);
  } else {
    //  chekc if there is such email get the user info
    User.findOne({ email: req.body.email })
      .then(result => {
        //  check if the password valid
        bcrypt.compare(req.body.password, result.password, function (err, response) {
          if (response) {
            const token = jwt.sign({ "_id": result._id }, 'key');
            const email = result.email;
            const type = result.type;
            res.header({ 'x-auth-token': token, 'email': email, 'type': type }).json({
              'success': 'You are logged in',
              'x-auth-token': token,
              'email': email,
              'type': type
            })
          } else {
            res.status(400).json({
              'failed': 'you entered incorrect password'
            })
          }
        });
      }).catch(err => {
        res.status(404).json({
          'failed': 'you entered incorrect email'
        })
      });
  }
  //  create a new token and send it back to the user in the response header
});

// Getting all users
router.get('/users', (req, res) => {
  User.find()
    .then(result => {
      res.send(result);
    }).catch(err => {
      res.status(400).send(err)
    })
})

// Adding a new User
router.post('/add', (req, res) => {
  // Setting Schema so i can validate it
  const validating = userValidating(req.body);
  if (validating.error) {
    res.status(400).send(validating.error.details);
  } else {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: req.body.password,
      type: req.body.type,
    });
    //  Checking the Mongoose Schema Validating
    const v = user.validateSync();
    // If the validateSync returns any string, that means that there is somthing wrong in saving the data
    if (v)
      res.status(400).send('There is somthing wrong');
    //  IF the above if didn't wokred then the program can contiue to the below lines
    user.save()
      .then(result => {
        //  IF the user saved in the database
        res.send('You have added a new user');
        console.log(result);
      })
      .catch(err => {
        //  IF the user hasn't saved in the database

        res.status(401).send(err);
        console.log(err);
      });
  }
});

// PUT to edit user
router.put('/:id', (req, res) => {
  // If req.body is valid
  const validating = userValidating(req.body);
  //  If the validation fails
  if (validating.error) {
    res.status(400).send(validating.error.details);
  } else {
    //  You can use updateMany
    User.updateOne({ _id: req.params.id }, { $set: req.body })
      .then(result => {
        res.send(`Number of updated users is ${result.n}`);
      }).catch(err => {
        res.status(400).send(err);
      });
  }
});

// Deleting a user
router.delete('/:id', (req, res) => {
  User.remove({ _id: req.params.id }).then(result => {
    res.send(`Number of deleted users is ${result.n}`)
  }).catch(err => {
    res.status(400).send(err);
  });
});

//  To validate the POST PUT requestes
function userValidating(user) {
  const userSchema = {
    'email': Joi.string().required(),
    'password': Joi.string().min(5).required(),
    'type': Joi.string().required()
  }
  return Joi.validate(user, userSchema);
}

function authValidating(user) {
  const userSchema = {
    'email': Joi.string().required(),
    'password': Joi.string().min(5).required()
  }
  return Joi.validate(user, userSchema);
}

//  Expoting the router so app.js can use it in a MiddleWare
module.exports = router;