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
Admin.prototype.isAdmin = async (username, password)=>{
    let rs = await Admin.findOne({
        where:{
            username: username,
            password: password
        }
    });
    if(rs === null){
        console.log("Incorection Password or Username");
    }
}
module.exports = Admin;