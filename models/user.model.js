const sequelize = require('./db');
const {DataTypes} = require('sequelize');

const user = sequelize.define('user',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
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
        type: DataTypes.STRING(10),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    ngaysinh: {
        type: DataTypes.DATE
    },
    gender: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: '/images/uploads/avatar/default.png'
    }
},{
    tableName:'user',
    timestamps:false
});

module.exports = user;