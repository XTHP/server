const sequelize = require('../dbs/dbconnect')
const Group = require('./group')
const Message = require('./message')
const User = require('./user')

// 指定message消息来自哪个房间
Group.hasMany(Message, { foreignKey: "roomId", targetKey: "id" })
// 消息是那个用户产生的
User.hasMany(Message, { foreignKey: "ownerId", targetKey: "id" })
// 用户所在房间列表
User.belongsToMany(Group, { through: 'UserGroup' })
// 房间是由那个用户创建的
Group.belongsTo(User, { as: "createUser" })
// 创建一个新的表
// 包含谁屏蔽谁 和屏蔽者id 被屏蔽者id
User.belongsToMany(User, { through: 'UserShield', as: 'user', foreignKey: 'shield_id' });
User.belongsToMany(User, { through: 'UserShield', as: 'shield', foreignKey: 'user_id' });
sequelize.sync({
    force: false
})
module.exports = sequelize