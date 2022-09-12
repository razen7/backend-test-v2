const bookModel = require('../models/book');

const URL_Router = require('express').Router();

// Add book
URL_Router.post('/', async (req, res) => {
    const { title, authorId } = req.body;

    try {
        const newBook = new bookModel({
            title,
            author: authorId
        });
        const savedBook = await newBook.save();
        res.status(201).send('Book created with ID: ' + savedBook.id)
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// List Books and filter by status and author name
URL_Router.get('/', async (req, res) => {
    let books = await bookModel.find()
        .populate("author", "name")

    let [status, authorName] = [req.query.status, req.query.author];
    console.log(status, 'hh');
    if (status) {
        books = await books.filter(book => book.is_being_issued === (status === 'available' ? false : true))
    }
    if (authorName) {
        books = await books.filter(book => {
            // console.log(book.author.name, authorName);
            return book.author.name === authorName
        })
    }

    res.status(201).send(books);
});


module.exports = URL_Router;