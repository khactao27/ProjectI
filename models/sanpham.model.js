const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const thuonghieu = require('./thuonghieu.model');

const products = sequelize.define('sanpham', {
    maSP: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    tenSP: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    hinhanhSP: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    HDH: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    mausac: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true
    },
    ram: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    pin: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    manhinh: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    cpu: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    motaSP: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    giaSP: {
        type: DataTypes.DECIMAL(18, 0),
        allowNull: false
    },
    sanco: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bonho: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    maTH: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: thuonghieu,
            key: 'maTH'
        }
    },
    camera_truoc: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    camera_sau: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    sim: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'sanpham',
    timestamps: false
});
module.exports = products;