const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('phone_db', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
module.exports = sequelize;