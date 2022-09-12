const express = require('express');
const morgan = require('morgan');

const connectToDB = require('./server_config/db-config');
require('dotenv').config();

const app = express();
connectToDB();

const jwt = require('jsonwebtoken');

// Router Imports
const authRouter = require('./routes/' + 'auth.route');
const authorRouter = require('./routes/' + 'author.route');
const bookRouter = require('./routes/' + 'book.route');
const issueRouter = require('./routes/' + 'issue.route');

function authenticateRequest(req, res, next) {
    const authHeaderInfo = req.headers['authorization'];

    if (authHeaderInfo === undefined) {
        res.status(404).send('No Token Provided')
    }

    const token = authHeaderInfo.split(" ")[1];
    if (token === undefined) {
        res.status(401).send("Proper token not provided")
    }

    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userInfo = payload;
        next();
    } catch (error) {
        res.status(401).send('Invalid Token ' + error.message)
    }
}

// middleware
app.use(express.json());
app.use(morgan('dev'));

// Router related usage
app.use('/auth', authRouter);
app.use(authenticateRequest);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);
app.use('/issues', issueRouter);

app.listen('8000');