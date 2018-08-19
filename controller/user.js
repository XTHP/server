const User = require('../model/user');
const crypto = require('crypto');
const md5 = crypto.createHash('md5');
const common = require('../config/common');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../config/index').JWT_KEY;

// 创建token
function createToken(id) {
    let exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
    let token = jwt.sign({
        user: id, exp
    }, JWT_KEY)
    return token
}

module.exports = {
    /**
     * 创建用户
     */
    async createUser(info) {
        // 是否有错误
        let requestError = false
        let { email, name, password } = info
        const user = await User.findOne({
            where: {
                $or: [{ email }, { name }]
            }
        })
        // if (user) {
        //     return
        // }
        let avatar = common.randomAvatar();
        // 将信息添加到表中
        password = md5.update(password, 'utf8').digest('hex')
        let createTime = Date.now()
        let newUser = await User.create({
            email,
            name,
            password,
            avatar,
            signature: "",
            createTime,
            updateTime: createTime
        })
        if (!newUser) {
            return
        }
        let dataValues = newUser.dataValues
        let token = createToken(dataValues.id)
        setTimeout(() => {
            jwt.verify(token, JWT_KEY, function (err, decoded) {
                console.log(err, decoded) // bar
            })
        }, 7000)

    }
}