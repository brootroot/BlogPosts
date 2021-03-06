const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { BlogPosts } = require('../models.js');

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'publishDate'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `You're missing ${i}`;
      console.log(message);
      return res.status(400).send(message);
    }
  }
  const newPost = BlogPosts.create(
    req.body.title,
    req.body.content,
    req.body.author,
    req.body.publishDate
  );
  res.status(201).json(newPost);
});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['id', 'title', 'content', 'author', 'publishDate'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `You're missing ${field}`;
      console.log(message);
      res.status(400).send(message);
    }
  }

  if (req.body.id !== req.params.id) {
    const message = "Your ID's must match!";
    console.log(message);
    return res.status(400).send(message);
  }

  const updatedPost = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });
  res.status(204).end();
});

router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  res.status(204).end();
});

module.exports = router;
