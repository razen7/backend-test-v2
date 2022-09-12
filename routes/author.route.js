const authorModel = require('../models/author');
const bookModel = require('../models/book');
const URL_Router = require('express').Router();

// Create New Author
URL_Router.post('/add', async (req, res) => {
    const { name } = req.body;
    try {
        const newAuthor = new authorModel({
            name
        });
        const savedAuthor = await newAuthor.save();
        res.status(201).send('Author created with ID: ' + savedAuthor.id)
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// List Authors
URL_Router.get('/', async (req, res) => {
    const authors = await authorModel.find();

    res.status(201).send(authors);
});

// List All books of Author
URL_Router.get('/:id', async (req, res) => {
    const authorId = req.params.id;
    const books = await bookModel.find({ author: authorId })
        .populate("author", "name");

    res.status(201).send(books);
});

module.exports = URL_Router;