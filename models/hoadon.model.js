const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const Admin = require('./admin.model');

const bill = sequelize.define('donhang', {
    maDH: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
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
    }
}, {
    tableName: 'donhang',
    timestamps: false
});
module.exports = bill;