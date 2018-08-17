
const Sequelize = require('sequelize')
const config = require('../dbs/dbconnect').dbsConfig
const { database, username, password, host } = config
// 创建一个映射实例
var sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    logging: false
})
// 创建用户表映射
const user = sequelize.define('user', {
    id: {
        type: Sequelize.BIGINT(100),
        primaryKey: true,
        allowNull: false,
        unique: false,
        autoIncrement: true
    },
    // 用户邮箱
    user_email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
    },
    // 用户密码
    user_password: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    // 用户名称
    user_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        // unique:false
    },
    // 用户头像
    user_avatar: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    // 用户签名
    user_signature: {
        type: Sequelize.STRING(200)
    },
    // 用户创建时间
    user_createTime: {
        type: Sequelize.BIGINT(50)
    },
    // 最后一次登录时间
    user_updateTime: {
        type: Sequelize.BIGINT(50)
    },
    // 在线状态
    user_status:{
        type: Sequelize.STRING(10),
    }
}, {
        timestamps: false
    });
// 同步表没有就会创建表
user.sync()
module.exports = user



