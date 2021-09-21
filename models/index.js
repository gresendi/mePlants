const User = require('./User.js')
const Post = require('./Post.js')
const Plant = require('./Plant.js')

User.hasMany(Post, { foreignKey: 'uid' })
Post.belongsTo(User, { as: 'u', foreignKey: 'uid' })

User.hasMany(Plant, { foreignKey:'uid'})
Plant.belongsTo(User, {as:'u',foreignKey: 'uid'})

module.exports = { User, Post, Plant }
