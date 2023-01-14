const express = require('express');
const userController = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');


userController.get('/',(req ,res) => {
    User.findAll().then((users) => {
        return res.json(users);
    }).catch((error) => {
        return res.json(error);
    })
});

userController.post('/', [
    body('first_name').isLength({ min: 3 }).withMessage("Min lenght is 3 char"),
    body('last_name').isLength({ min: 3 }).withMessage("Min lenght is 3 char")
], (req, res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json(errors);
    }
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    User.create({
        firstName: firstName,
        lastName: lastName
    }).then((user) => {
        return res.status(201).json(user);
    }).catch((err) => {
        return res.status(500).json(err);
    })
});

module.exports = userController;