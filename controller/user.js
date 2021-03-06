const User = require('../model/user');
const crypto = require('crypto');
const common = require('../config/common');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../config/index').JWT_KEY;
const Errors = require('../config/status')


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
     * @param {*} info 
     */
    async createUser(info) {
        // 是否有错误
        let { email, name, password } = info
        const user = await User.findOne({
            where: {
                $or: [{ email }, { name }]
            }
        })
        if (user) {
            return Errors('ERROR1')
        }
        let avatar = common.randomAvatar();
        // 将信息添加到表中
        password = crypto.createHash('md5').update(password, 'utf8').digest('hex')
        let createTime = Date.now()
        let newUser = await User.create({
            email,
            name,
            password,
            avatar,
            createTime,
            updateTime: createTime
        })
        if (!newUser) {
            return Errors('ERROR10')
        }
        let dataValues = newUser.dataValues
        let token = createToken(dataValues.id)
        return { code: 1, token }
    },
    /**
     * 用户登录
     * @param {email,password,device} info 
     */
    async loginUser(info) {
        let { email, password, device } = info
        password = crypto.createHash('md5').update(password, 'utf8').digest('hex')
        const user = await User.findOne({
            attributes: ['id', 'name', 'avatar', 'signature', 'email'],
            where: {
                $and: [{ email }, { password }]
            }
        }).catch((err) => {
            console.log(1)
        })
        if (!user) {
            return Errors('ERROR3')
        }
        // 更新最后登录时间
        let updateTime = Date.now()
        user.updateTime = updateTime
        user.status = device
        await user.save()

        let dataValues = user.dataValues
        let token = createToken(dataValues.id)
        return { code: 1, token, msg: dataValues }
    },
    /**
     * 用户修改信息包括头像，个性签名等
     * 修改形式为{ avatar: "http://haiping.cn" }
     */
    async changeUser(info, msg) {
        let { id } = info
        msg = msg || {}
        // 如果是修改密码返回错误
        if (msg.password && msg.email) {
            return Errors('ERROR4')
        }
        const user = await User.update(msg, {
            where: {
                id: id
            }
        })
        if (!user) {
            return Errors('ERROR10')
        }
        return { code: 1, msg: msg }
    },
    /**
     * 初始化用户所有信息
     * @param {*} info 
     * @param {*} io 
     */
    async initUser(info, io) {
        let { id } = info
        let user = await User.findOne({
            attributes: ['id', 'name', 'avatar', 'signature', 'email'],
            where: {
                id: id
            }
        })
        if (!user) {
            return Errors('ERROR10')
        }
        return {
            code: 1,
            self: user.dataValues
        }
    }
}