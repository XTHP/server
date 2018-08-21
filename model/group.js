const Sequelize = require('sequelize')
const sequelize = require('../dbs/dbconnect')
// 创建用户表映射
const group = sequelize.define('groups', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    // 消息类型 区分是图片还是文件还是信息
    name: {
        type: Sequelize.STRING,
        content: '群组名称'
    },
    // 消息类型 区分是图片还是文件还是信息
    avatar: {
        type: Sequelize.STRING,
        content: '群组头像'
    },
    // 用户创建消息时间
    inviteLink: {
        type: Sequelize.STRING,
        content: '用户邀请码'
    },
    bulletin: {
        type: Sequelize.STRING,
        comment: '群组公告',
    },
    isPravite: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: '是否私聊群组',
    },
    last_message: {
        type: Sequelize.STRING,
        comment: '群组最后一条信息',
    },
    last_time: {
        type: Sequelize.STRING,
        comment: '群组最后一条消息的时间',
    }
}, {
        timestamps: false
    });
// 同步表没有就会创建表
module.exports = group



