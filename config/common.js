const { AVATAR, LETTER } = require('./index')
module.exports = {
    // 随机头像
    randomAvatar() {
        let length = AVATAR.length
        let pos = Math.floor(Math.random() * length)
        return AVATAR[pos]
    },
    // 格式化时间
    formatTime(time) {
        let data = new Date(time)
        let month = data.getMonth() + 1
        let year = data.getFullYear()
        let date = data.getDate()
        let day = data.getDay()
        let hour = "0" + data.getHours()
        let minutes = "0" + data.getMinutes()
        let days = [
            "星期天",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
        ]
        day = days[day]
        hour = hour.substr(-2, 2)
        minutes = minutes.substr(-2, 2)
        return {
            month, year, date, day, hour, minutes
        }
    },
    // 创建随机Link码
    createLink(len) {
        let length = LETTER.length
        let str = ''
        for (let i = 0; i < len; i++) {
            let pos = Math.floor(Math.random() * length)
            str += LETTER[pos]
        }
        return str
    }
}