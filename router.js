const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const {body, validationResult} = require("express-validator");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require('./middleware/auth');

router.use('/user',[authMiddleware], userController);


router.post('/login', [
    body('username').not().isEmpty().withMessage("username field is required.")
        .trim(),
    body('password').not().isEmpty().withMessage("password field is required")
], (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(422).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({where: {username: username}}).then((user) =>{
        if(!user){
            res.status(404).json({res: "User not found"})
        }

        bcrypt.compare(password, user.password).then((correct) => {
            if(correct){
                const token = jwt.sign({username: user.username, email: user.email},
                    process.env.JWT_KEY_SECRET, {expiresIn: "2m"});
                res.status(200).json({accessToken: token});
            }
            res.status(401).json("Unauthorized");
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
});


module.exports = router;