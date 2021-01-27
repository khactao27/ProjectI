const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('phone_db', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});
module.exports = sequelize;