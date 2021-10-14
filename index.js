// Our initial setup (package requires, port number setup)
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000

const app = express();

// Route setup. You can implement more in the future!
const ta01Routes = require('./routes/ta01');
const ta02Routes = require('./routes/ta02');
const ta03Routes = require('./routes/ta03');
const ta04Routes = require('./routes/ta04');
const ta05Routes = require('./routes/ta05');

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

  .use(bodyParser({
    extended: false
  })) // For parsing the body of a POST
  .use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false
    }))
  .use('/ta01', ta01Routes)
  .use('/ta02', ta02Routes.routes)
  .use('/ta03', ta03Routes)
  .use('/ta04', ta04Routes)
  .use('/ta05', ta05Routes)
  .get('/', (req, res, next) => {
    // This is the primary index, always handled last.
    res.render('pages/index', {
      title: 'Welcome to my CSE341 repo',
      path: '/',
    });
  })
  .use((req, res, next) => {
    // 404 page
    res.render('pages/404', {
      title: '404 - Page Not Found',
      path: req.url
    });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));