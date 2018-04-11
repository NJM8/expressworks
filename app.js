const express = require('express');

const app = express();

app.get('/home', (req, res) => {
  return res.send('Hello World!');
});

app.use(express.static(process.argv[3] || path.join(__dirname, 'public')));

app.listen(process.argv[2]);