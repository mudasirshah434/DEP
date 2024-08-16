const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

// Render the form for creating a new article
router.get('/new', (req, res) => {
  res.render('new', { article: new Article() });
});

// Render a specific article
router.get('/:id', async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article == null) {
    res.redirect('/');
  } else {
    res.render('show', { article: article });
  }
});

// Handle the creation of a new article
router.post('/', async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  });

  try {
    article = await article.save();  // Do not redeclare 'article' here
    res.redirect(`/articles/${article.id}`);
  } catch (e) {
    console.log(e);
    res.render('new', { article: article });  // Use the correct view path
  }
});


module.exports = router;
