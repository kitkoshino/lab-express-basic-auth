const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const authenticationRouter = express.Router();

authenticationRouter.get('/create-account', (req, res) => {
  res.render('create-account');
});

authenticationRouter.post('/create-account', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  bcrypt
    .hash(password, 8)
    .then((hashAndSalt) => {
      return User.create({
        username,
        password: hashAndSalt
      });
    })
    .then((user) => {
      req.session.userId = user._id;
      res.redirect('log-in');
    })
    .catch((error) => {
      next(error);
    });
});

authenticationRouter.get('/log-in', (req, res) => {
  res.render('log-in');
});

authenticationRouter.post('/log-in', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  let user;

  User.findOne({ username })
    .then((document) => {
      user = document;

      return bcrypt.compare(password, user.password);
    })

    .then((comparison) => {
      if (comparison) {
        req.session.userId = user._id;
        res.redirect('../profile');
      } else {
        return Promise.reject(new Error('PASSSWORD_DOES_NOT_MATCH'));
      }
    })
    .catch((error) => {
      next(error);
    });
});


module.exports = authenticationRouter;
