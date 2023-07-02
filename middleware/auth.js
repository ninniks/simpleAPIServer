const express = require('express');
const jwt = require('jsonwebtoken');

const authMiddleware = express();

authMiddleware.use((req, res, next) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        try {
            let decoded = jwt.verify(token, process.env.JWT_KEY_SECRET);
            !decoded ?
                res.status(403).json({error: "Your token has been expired or is not valid."}) :
                req.user = decoded;
            next();
        } catch (err) {
            return res.status(403).json({error: err.message});
        }
    } else {
        return res.status(403).send({error: "No auth header specified"}).end();
    }
});

module.exports = authMiddleware;