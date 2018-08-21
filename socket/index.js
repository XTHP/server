const user = require('../controller/user')
const room = require('../controller/room')
// user.loginUser({
//   email: '847186328@qq.com',
//   password: "123456",
//   device:'安卓'
// })
// user.changeUser({id:1},{signature:"dsadasdadsad"})
room.createRoom({ id: 1 }, { name: "dsdsd" })
// 错误捕获
function callbackError(cb, err) {
  console.log(err);
  return cb();
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
    })
    );
    // 用户登录
    socket.on("login", capture(async (info, cb) => {
      // let rc = await login(info);
      // return cb(rc);
    })
    );
    // 用户注册
    socket.on("registered", capture(async (info, cb) => {
      // let rc = await login(info);
      // return cb(rc);
    })
    );
    // 用户发送信息
    socket.on("sendMsg", capture(async (info, cb) => {
      // let rc = await login(info);
      // return cb(rc);
    })
    );
  });
};
