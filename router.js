const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const {body, validationResult} = require("express-validator");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require('./middleware/auth');

router.use('/api/user',[authMiddleware], userController);


router.post('/api/login', [
    body('username').not().isEmpty().withMessage("username field is required.")
        .trim(),
    body('password').not().isEmpty().withMessage("password field is required")
], (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json(errors).end();
    }

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({where: {username: username}}).then((user) =>{
        if(!user){
            return res.status(404).json({res: "User not found"}).end()
        }

        bcrypt.compare(password, user.password).then((correct) => {
            if(correct){
                const token = jwt.sign({username: user.username, email: user.email},
                    process.env.JWT_KEY_SECRET, {expiresIn: "2m"});
                return res.status(200).json({accessToken: token}).end();
            }
            return res.status(401).json("Unauthorized").end();
        }).catch((err) => {
            return res.status(500).json(err).end();
        });
    });
});


module.exports = router;