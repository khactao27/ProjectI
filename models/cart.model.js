const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const user = require('./user.model');

const Cart = sequelize.define('giohang', {
    maGH: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    tongTien: {
        type: DataTypes.DECIMAL(18, 0),
        allowNull: false
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: 'id'
        }
    }
}, {
    tableName: 'giohang',
    timestamps: false
});
module.exports = Cart;