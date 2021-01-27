const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const Admin = require('./admin.model');
const Cart = require('./cart.model');

const bill = sequelize.define('donhang', {
    maDH: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    diachi: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    ngaydat: {
        type: DataTypes.DATE,
        allowNull: false
    },
    trangthai: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    maGH: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cart,
            key: 'maGH'
        }
    },
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Admin,
            key: 'id'
        }
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    note: {
        type: DataTypes.TEXT
    },
    fullname: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
}, {
    tableName: 'donhang',
    timestamps: false
});
module.exports = bill;