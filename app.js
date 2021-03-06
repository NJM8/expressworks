const express = require('express');
const bodyParser = require('body-parser');
const nib = require('nib');
const stylus = require('stylus');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const jsonParser = bodyParser.json();
const app = express();

function compile(str, path) {
  return stylus(str)
  .set('filename', path)
  .use(nib());
}

app.use(stylus.middleware({
  src: __dirname + '/public',
  compile: compile
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'templates'));

app.get('/home', (req, res) => {
  return res.render('index', { date: new Date().toDateString() });
});

app.get('/search', (req, res) => {
  return res.send(req.query);
});

app.get('/books', (req, res) => {
  console.log(process.argv[3]);
  const location = process.argv[3]
  fs.readFile(location, (err, data) => {
    if (err) {
      console.log(err);
      return res.send(500).status('File error');
    }
    try {
      books = JSON.parse(data);
    } catch (err) {
      console.log(err);
      return res.send(500).status('File error');
    }
    return res.json(books);
  })
});

app.post('/form', (req, res) => {
  return res.send(req.body.str.split('').reverse().join(''));
});

app.put('/message/:id', (req, res) => {
  const newHash = crypto.createHash('sha1').update(new Date().toDateString() + req.params.id).digest('hex');
  return res.send(newHash);
});

app.listen(process.argv[2]);
