const bcrypt = require('bcrypt');
const URL_Router = require('express').Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

URL_Router.post('/authors', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.status(400).send('Passwords don\'t match');
    }

    try {
        const hash = await bcrypt.hashSync(password, saltRounds = 10);

        const newUser = new userModel({
            name, email, password: hash
        });
        const savedUser = await newUser.save();
        res.status(201).send('User created with ID: ' + savedUser.id)
    } catch (e) {
        res.status(400).send(e.message);
    }
});

URL_Router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ email: email });

    if (existingUser === null) {
        return res.status(501).send('Email not registered');
    }

    bcrypt.compare(password, existingUser.password, function (err, result) {
        if (result) {
            const payload = {
                id: existingUser.id,
                email: existingUser.email,
            }

            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

            res.status(201).send({
                accessToken,
                userId: existingUser.id
            })
        } else {
            res.status(201).send('incorrect password!');
        }
    })
});


module.exports = URL_Router;