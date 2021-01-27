const sequelize = require('./db');
const {DataTypes} = require('sequelize');

const user = sequelize.define('user',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(10)
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    dob: {
        type: DataTypes.DATE
    },
    gender: {
        type: DataTypes.STRING(100)
    },
    avatar: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: '/images/account.png'
    }
},{
    tableName:'user',
    timestamps:false
});

module.exports = user;