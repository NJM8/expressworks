const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(process.argv[3] || path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'templates'))

app.get('/home', (req, res) => {
  return res.render('index', { date: new Date().toDateString() });
});


app.listen(process.argv[2]);