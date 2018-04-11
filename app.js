const express = require('express');
const bodyParser = require('body-parser');
const nib = require('nib');
const stylus = require('stylus');
const path = require('path');
const app = express();

function compile(str, path) {
  return stylus(str)
  .set('filename', path)
  .use(nib())
}

app.use(stylus.middleware({
  src: __dirname + '/public',
  compile: compile
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'templates'));

app.get('/home', (req, res) => {
  return res.render('index', { date: new Date().toDateString() });
});

app.post('/form', (req, res) => {
  return res.send(req.body.str.split('').reverse().join(''));
})

app.listen(process.argv[2]);
