const express = require('express');
const jwt = require('jsonwebtoken');

const authMiddleware = express();

authMiddleware.use((req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        jwt.verify(token, process.env.JWT_KEY_SECRET, (err, decoded) => {
            if(err){
                res.status(403).json(err);
            }

            if(!decoded){
                res.status(403).json("Your token has been expired or is not valid.");
            }
            req.user = decoded;
        });
        next();
    } else {
        res.status(403)
    }
});

module.exports = authMiddleware;