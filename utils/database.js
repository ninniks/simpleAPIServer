const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodejs_db','root','roottoor', {
    dialect : "mysql",
    host : "localhost"
});

module.exports = sequelize;