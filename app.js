const express = require('express');

const app = express();

app.get('/home', (req, res) => {
  return res.send('Hello World!');
});

app.listen(process.argv[2]);