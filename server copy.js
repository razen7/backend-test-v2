const express = require('express');
const morgan = require('morgan');

const connectToDB = require('./server_config/db-config');
require('dotenv').config();

const app = express();
connectToDB();

const authRouter = require('./routes/' + 'auth.route');
const authorRouter = require('./routes/' + 'author.route');
const bookRouter = require('./routes/' + 'book.route');
const issueRouter = require('./routes/' + 'issue.route');

// middleware
app.use(express.json());
app.use(morgan('dev'));

// Router related usage
app.use('/auth', authRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);
app.use('/issues', issueRouter);

app.listen('8000');