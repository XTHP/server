const room = require('../model/group');
const User = require('../model/user')
const common = require('../config/common')
const Errors = require('../config/status')
module.exports = {
    /**
     * 创建群组
     * @param {id} info 
     * @param {name} msg 
     * 一个人最多只能创建三个群聊群组
     * @param { id } info
     * @param { name } msg
     */
    async createRoom(info, msg) {
        let { id } = info
        let { name } = msg
        let roomLen = await room.count({
            include: {
                model: User,
                as: 'createUser',
                id: id
            }
        })
        if (roomLen >= 3) {
            return Errors('ERROR1')
        }
        let inviteLink = common.createLink(10)
        let newRoom = await room.create({
            name,
            inviteLink,
            createUserId: id
        })
        if (!newRoom) {
            return Errors('ERROR1')
        }
        return {
            isError: false,
            msg: newRoom.dataValues
        }
    }
}