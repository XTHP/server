// 报错返回信息

const ERRORS = {
    'ERROR1': {
        err: 'ERROR1',
        msg: '用户或邮箱已存在'
    },
    'ERROR2': {
        err: 'ERROR2',
        msg: '服务器异常'
    },
    'ERROR3': {
        err: 'ERROR3',
        msg: '邮箱或者密码不正确'
    },
    'ERROR4': {
        err: 'ERROR4',
        msg: '修改错误'
    },
    'ERROR5': {
        err: 'ERROR5',
        msg: '你创建的群组已达上限'
    },
    'ERROR6': {
        err: 'ERROR6',
        msg: '发送消息失败'
    },
    'ERROR7': {
        err: 'ERROR7',
        msg: '大于两分钟的消息不能撤回'
    },
    'ERROR8': {
        err: 'ERROR8',
        msg: '信息有误'
    },
    'ERROR9': {
        err: 'ERROR9',
        msg: '撤回失败'
    },
    'ERROR10': {
        err: 'ERROR9',
        msg: '服务器错误'
    }
}
module.exports = function (err) {
    let error = ERRORS[err]
    error.code = 0
    return error
}

