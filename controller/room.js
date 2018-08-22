const room = require('../model/group');
const User = require('../model/user')
const common = require('../config/common')
const Errors = require('../config/status')
module.exports = {
    /**
     * 这里不需要token都能看到信息，获取房间信息
     * @param {id} info
     */
    async initRoom(info) {
        let { id } = info
        let roomMsg = await room.findOne({
            attributes: ['id', 'name', 'avatar', 'inviteLink', 'last_message','last_time'],
            where: {
                id: id
            }
        })
        console.log(roomMsg)
        if (!roomMsg) {
            return Errors('ERROR1')
        }
        return {
            code: 1,
            msg: {
                ...roomMsg.dataValues
            }
        }
    },
    /**
     * 创建群组
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
    },
    /**
     * 修改房間信息
     * @param {id} info 
     * @param {id,opt} msg 
     */
    async changeRoom(info, msg) {
        let { id: userId } = info
        let { id: roomId, opt } = msg
        let roomOne = await room.findOne({
            where: {
                id: roomId
            },
            include: {
                model: User,
                as: 'createUser',
                id: userId
            }
        })
        if (!roomOne) {
            return Errors('ERROR1')
        }
        await roomOne.update(opt)
        if (!roomOne) {
            return Errors('ERROR1')
        }
        let { name, avatar, inviteLink } = roomOne.dataValues
        return {
            code: 1,
            msg: {
                name, avatar, inviteLink
            }
        }
    }
}