const room = require('../model/group');
const User = require('../model/user')
const common = require('../config/common')
module.exports = {
    /**
     * 创建群组
     * @param {id} info 
     * @param {name} msg 
     * 一个人最多只能创建三个群聊群组
     */
    async createRoom(info, msg) {
        let { id } = info
        let { name } = msg
        let rooms = room.findAll({
            where: {
                createUserId: id
            }
        })
        console.log(rooms)
        let inviteLink = common.createLink(7)
        let newRoom = room.create({
            name,
            inviteLink,
            createUserId: id
        })
        if (!newRoom) {
            return Errors('ERROR1')
        }
        console.log(newRoom)
        return {
            isError: false,
            msg: newRoom.dataValues
        }
    }
}