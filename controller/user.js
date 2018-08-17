const user = require('../model/user');
const crypto = require('crypto');
const md5 = crypto.createHash('Md')
module.exports = {
    createUser: async (info) => {
        // 是否有错误
        let requestError = false
        let { user_email, user_name, user_password } = info
        // 将信息添加到表中
        let userMsg = await user.create({
            user_email: user_email,
            user_name: user_name,
            user_password: "12343222",
            user_avatar: "http://dad",
            user_signature: "",
            user_createTime: 12131,
            user_updateTime: 156465
        }).catch((err) => {
            requestError = true
        })
        return userMsg
    }
}