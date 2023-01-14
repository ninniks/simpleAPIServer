const express = require('express');
const userController = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


userController.get('/',(req ,res) => {
    User.findAll().then((users) => {
        res.json(users);
    }).catch((error) => {
        res.status(500).json(error);
    })
});

userController.post('/', [
    body('username').not().isEmpty().withMessage("username field is required.")
        .trim().isLength({ min: 5 }).withMessage("Min length is 5 char"),
    body('email').not().isEmpty().withMessage("email field is required")
        .trim().isEmail().withMessage("must provide a valid email"),
    body('password').not().isEmpty().withMessage("password field is required")
        .isLength({ min: 8}).withMessage("password must be at the least 8 char"),
    body('first_name').isLength({ min: 3 }).withMessage("Min length is 3 char"),
    body('last_name').isLength({ min: 3 }).withMessage("Min length is 3 char")
], (req, res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(422).json(errors);
    }
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 10).then((hashedPassword) => {
        User.create({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword
        }).then((user) => {
            res.status(201).json(user);
        }).catch((err) => {
            res.status(500).json(err);
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = userController;