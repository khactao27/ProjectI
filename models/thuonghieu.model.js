const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const thuonghieu = sequelize.define('thuonghieu', {
    maTH: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    tenTH: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    logoTH: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, {
    tableName: 'thuonghieu',
    timestamps: false
});

module.exports = thuonghieu;

