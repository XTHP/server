const Sequelize = require('sequelize')
const sequelize = require('../dbs/dbconnect')
/**
 * @type 创建消息表
 */
const message = sequelize.define('message', {
    id: {
        type: Sequelize.BIGINT(100),
        primaryKey: true,
        autoIncrement: true
    },
    // 消息类型 区分是图片还是文件还是信息
    contentType: {
        type: Sequelize.STRING(225),
        content: '用户消息类型'
    },
    content: {
        type: Sequelize.STRING,
        comment: '消息内容'
    },
    // 用户创建消息时间
    contentTime: {
        type: Sequelize.BIGINT(50),
        content: '用户发送消息时间'
    },
    isPrivate: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: '是否私聊信息',
    },
    isDel: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: '是否撤回',
    }
}, {
        timestamps: false
    });
// 同步表没有就会创建表
module.exports = message



