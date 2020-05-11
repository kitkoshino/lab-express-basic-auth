const { Router } = require('express');
const router = Router();
const routeGuard = require('./../middleware/routeGuard');
const bindUserDocumentToResponseLocals = require('./../middleware/datas');
const User = require('../models/user');

router.use(bindUserDocumentToResponseLocals);

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/main', routeGuard, (req, res) => {
  res.render('main');
});

router.get('/private', routeGuard, (req, res) => {
  res.render('private');
});

router.get('/profile', routeGuard, (req, res) => {
  console.log('rota profile');
  res.render('profile');
});

router.get('/:id/edit', (req, res) => {
  const userId = req.params.id;
  res.render('profile-edit');
});

router.post('/:id/edit', (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const profile = {
    username: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: true
    },
    name: String

  };

  User.findByIdAndUpdate(userId, profile).then(() => {
    res.redirect('profile');
  });
});

module.exports = router;
