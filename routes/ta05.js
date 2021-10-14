//TA04 PLACEHOLDER
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    if (!req.session.style) {
        req.session.style = ['dark', 'red', 'green', 'purple'];
    }
    
    i = req.session.styleCounter % req.session.style.length;

    if (!req.session.counter) {
        req.session.counter = 0;
    }
    res.render('pages/ta05', {
        title: 'Team Activity 05',
        path: '/ta05',
        style: req.session.style[i],
        counter: req.session.counter
    });
});

router.post('/change-style', (req, res, next) => {
    if (!req.session.styleCounter) {
        req.session.styleCounter = 0;
    }
    req.session.styleCounter += 1;
    res.redirect('/ta05');
});

router.post('/counter', (req, res, next) => {
    const action = req.body.action;
    if(action === 'minus') {
        req.session.counter -= 1;
    }
    if (action === 'plus') {
        req.session.counter += 1;
    }
    res.redirect('/ta05');
});

router.get('/reset', (req, res, next) => {
    req.session.destroy();
    res.redirect('/ta05');
});

module.exports = router;