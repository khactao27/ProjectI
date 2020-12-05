const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const user = require('./user.model');

const Cart = sequelize.define('giohang', {
    maGH: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    tongTien: {
        type: DataTypes.DECIMAL(18, 0),
        allowNull: false
    },
    user_id: {
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