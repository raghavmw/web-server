const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {                                          // app.use() takes only 1 function as argument
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to log into file');
    }
  })
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));                                 // Express Middleware

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name: 'Raghav',
  //   likes: [
  //     'Soccer',
  //     'Driving'
  //   ]
  // });

  res.render('home.hbs', {
    pageTitle: 'Home Page',
    bodyMsg: 'Welcome to my home page',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Portfolio',
    bodyMsg: 'This is my Portfolio page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to load the page'
  });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
