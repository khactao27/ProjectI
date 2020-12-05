const sequelize = require('./db');
const {DataTypes} = require('sequelize');

const Admin = sequelize.define('admin', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: '/images/uploads/avatar/default.png'
    },
    fullname: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
},{
    tableName: 'admin',
    timestamps: false
});
module.exports = Admin;