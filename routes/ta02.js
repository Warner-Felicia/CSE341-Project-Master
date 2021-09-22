//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!
const express = require('express');
const router = express.Router();

const users = [];
let addError = '';
let removeError = '';

router.get('/', (req, res, next) => {
  res.render('pages/ta02', {
    title: 'Team Activity 02',
    path: '/ta02', // For pug, EJS
    users: users,
    addError: addError,
    removeError: removeError
  });
  addError = '';
  removeError = '';
});

router.post('/addUser', (req, res, next) => {
  const username = req.body.username;
  const index = users.indexOf(username);
  if (index < 0) {
    users.push(username);
  } else {
    addError = 'Sorry that user name is already taken'
  }  
  res.redirect('/ta02');
});

router.post('/removeUser', (req, res, next) => {
  const username = req.body.userRemove;
  const index = users.indexOf(username);
  if (index >= 0) {
    users.splice(index, 1);
  } else {
    removeError = 'Sorry, user not found.';
  }


  res.redirect('/ta02');
});

exports.routes = router;
exports.users = users;