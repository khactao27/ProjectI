const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const Cart = require('./cart.model');
const sanpham = require('./sanpham.model');

const themvao = sequelize.define('themvao', {
    maSP:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: sanpham,
            key: 'maSP'
        }
    },
    maGH: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Cart,
            key: 'maGH'
        }
    },
    soluong: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'themvao',
    timestamps: false
});
module.exports = themvao;