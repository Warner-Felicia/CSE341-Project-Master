//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const fs = require('fs');

let items = [];
const url = 'https://byui-cse.github.io/cse341-course/lesson03/items.json';
  let settings = {
    method: "Get"
  };

fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
      try {
        items = (JSON.parse(JSON.stringify(json)));
      } catch (e) {
        console.log(e);
      }
    });

router.get('/', (req, res, next) => {
  
  res.render('pages/ta03', {
    title: 'Team Activity 03',
    path: '/ta03',
    items: items
  });
});

module.exports = router;