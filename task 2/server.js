const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const path = require('path');
const articleRouter = require('./routes/articles');

const port = 5000;
const app = express();

mongoose.connect('mongodb://localhost/blog')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.render('index', { articles });
  } catch (err) {
    res.status(500).send('Error retrieving articles.');
  }
});

app.use('/articles', articleRouter);

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
