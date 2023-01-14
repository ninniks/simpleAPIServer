const express = require('express');
const router = require('./router');
const sequelize = require('./utils/database');

const bodyParser = require('body-parser');

const app = express();

//using bodyParser becuase express has no longer body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

sequelize.authenticate().then((result) => {
    console.log("Connessione stabilita con il DB");
    sequelize.sync().then(() => {
        app.listen(8000);
    }).catch(() => {
        console.log("Error while Database Sync");
    })
}).catch("Errore di cconnessione al DB");