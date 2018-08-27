const user = require('../controller/user')
const room = require('../controller/room')
const His = require('../controller/message')
// user.createUser({
//     email: '847186328@qq.com',
//     password: "123456",
//     name:'安卓'
// })
// user.loginUser({
//   email: '847186328@qq.com',
//   password: "123456",
//   device:'安卓'
// })
// user.changeUser({id:1},{signature:"dsadasdadsad"})
// room.createRoom({id: 1},{name: "还"})
// room.initRoom({ id: 1 })
// His.createMsg({id: 1},{
//   contentType: "note", content:"你好呀", isPrivate: false,roomId: 1
// })
user.initUser({
  id: 1
}).then((data) => {
  console.log(data)
})

// 错误捕获
function callbackError(cb, err) {
  return cb({
    code: 0,
    msg: '身份认证已过期'
  });
}

function capture(fun) {
  return async (info, cb) => {
    try {
      fun(info, cb);
    } catch (error) {
      callbackError(cb, error);
    }
  };
}

module.exports = function (io) {
  io.on("connection", function (socket) {
    console.log("connect");
    // 断线重连
    socket.on("reconnect", capture(async (info, cb) => {
      // let rc = await login(info);
      // return cb(rc);
    }));
    // 用户登录
    socket.on("login", capture(async (info, msg, cb) => {
      let rc = await user.loginUser(info, msg);
      return cb(rc);
    }));
    // 用户注册
    socket.on("registered", capture(async (info, cb) => {
      let rc = await user.createUser(info);
      return cb(rc);
    }));
    // 修改信息
    socket.on("changeSelf", capture(async (info, msg, cb) => {
      let rc = await user.changeUser(info, msg)
      return cb(rc)
    }))
    // 用户发送信息
    socket.on("sendMsg", capture(async (info, msg, cb) => {
      let rc = await His.createMsg(info, msg, socket);
      return cb(rc);
    }));
    // 撤回消息
    socket.on("drawMsg", capture(async (info, msg, cb) => {
      let rc = await His.drawMsg(info, msg)
      return cb(rc)
    }))
    // 创建一个房间
    socket.on("createRoom", capture(async (info, msg, cb) => {
      let rc = await room.createRoom(info, msg)
      return cb(rc);
    }));
    // 修改房间信息
    socket.on("changeRoom", capture(async (info, msg, cb) => {
      let rc = await room.changeRoom(info, msg)
      return cb(rc)
    }));
    // 初始化所有信息
    socket.on("init",capture(async (info,cb)=>{
      // let rc = await 
    }))
  });
};