const room = require('../model/group');
const User = require('../model/user')
const His = require('../model/message')
const common = require('../config/common')
const Errors = require('../config/status')
// 历史信息
module.exports = {
    /**
     * 返回一个状态,发送信息
     * @param {id} info 
     * @param {*} msg 
     * @param io 指socket的对象
     */
    createMsg(info,msg,io){
        let { id } = info
        let { contentType, content, isPrivate,roomId } = msg
        let contentTime = Date.now()
        let newMsg = His.create({
            contentType,
            content,
            contentTime,
            isPrivate,
            ownerId: id,
            roomId
        })
        if(!newMsg){
            return Error('ERROR8')
        }
        // 消息创建成功，需要发送给用户和回调给发送信息者
        return {
            code: 1, 
            msg: true
        }
    },
    /**
     * 撤回消息功能
     * @param {id} info 
     * @param {*} msg 
     * @param {*} io 
     */
    async drawMsg(info,msg,io){
        let {id: ownerId  } = info
        let {id} = msg
        let time = Date.now()
        let Msg =await His.findOne({
            where: {
                id,
                ownerId
            }
        })
        if(!Msg){
            return Error('ERROR8')
        }
        let oldTime = Msg.contentTime
        // 两分钟以内可以撤回
        if((time - oldTime)>1000*60*2){
            return {code: 1,msg: "大于两分钟的消息不能撤回",success: false}
        }
        let msgDes = await Msg.destroy({
            where: {
                id: id
            }
        })
        // 广播
        if(!msgDes){
            return Error('ERROR9') 
        }
        return {code: 1,msg: "撤回成功", success: true}
    },
    /**
     * 登录成功，将自己加入自己所在的房间
     * @param {*} info 
     */
    async initRoom(info){
        let {id} = info
    }
}