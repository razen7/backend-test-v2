const bookModel = require('../models/book');
const issueModel = require('../models/issue');

const URL_Router = require('express').Router();

// issue a book
URL_Router.post('/', async (req, res) => {
    const { userId, bookId, dueDate } = req.body;

    try {
        const newIssue = new issueModel({
            user: userId,
            book: bookId,
            due_date: dueDate,
        });
        // Ref: https://mongoosejs.com/docs/tutorials/dates.html
        newIssue.lastActiveAt instanceof Date; // false

        const savedBook = await newIssue.save();

        await bookModel.findByIdAndUpdate(
            bookId,
            { is_being_issued: true },
            { new: true },
        )
        res.status(201).send('issue created with ID: ' + savedBook.id)
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// Get Overdue Issues
URL_Router.get('/overdue', async (req, res) => {
    const issues = await issueModel.find({ due_date: { $lte: new Date() } })
    res.status(201).send(issues);
});

// get details of issue by ID
URL_Router.get('/:id', async (req, res) => {
    const existingIssue = await issueModel.findById(req.params.id)
        .populate("book", "title");

    if (existingIssue === null) {
        return res.status(501).send('Issue not registered');
    } else {
        res.status(201).send({
            existingIssue
        })
    }
});

// Get All Issues
URL_Router.get('/', async (req, res) => {
    const issues = await issueModel.find()
        .populate("book", "title")

    res.status(201).send(issues);
});



module.exports = URL_Router;