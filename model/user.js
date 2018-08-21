const Sequelize = require('sequelize')
const sequelize = require('../dbs/dbconnect')
// 创建用户表映射
let User = sequelize.define('User', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    // 用户邮箱
    email: {
        type: Sequelize.STRING,
        // unique: true,
        content: '用户邮箱'
    },
    // 用户密码
    password: {
        type: Sequelize.STRING,
        content: '用户密码'
    },
    // 用户名称
    name: {
        type: Sequelize.STRING,
        content: '用户名称'
    },
    // 用户头像
    avatar: {
        type: Sequelize.STRING,
        content: '用户头像'
    },
    // 用户签名
    signature: {
        type: Sequelize.STRING,
        defaultValue: '',
        content: '用户签名'
    },
    // 用户创建时间
    createTime: {
        type: Sequelize.BIGINT(15),
        content: '用户创建时间'
    },
    // 最后一次登录时间
    updateTime: {
        type: Sequelize.BIGINT(15),
        content: '最后一次登录时间'
    },
    // 在线状态
    status: {
        type: Sequelize.STRING(10),
        content: '在线状态'
    }
}, {
        timestamps: false
    });
// 同步表没有就会创建表
module.exports = User



