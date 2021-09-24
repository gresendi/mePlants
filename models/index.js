// require models
const User = require('./User.js')
const Post = require('./Post.js')
const Plant = require('./Plant.js')
const Favorite = require('./Favorite.js')

// create connections between tables
User.hasMany(Post, { foreignKey: 'uid' })
Post.belongsTo(User, { as: 'u', foreignKey: 'uid' })

User.hasMany(Plant, { foreignKey:'uid'})
Plant.belongsTo(User, {as:'u',foreignKey: 'uid'})

User.hasMany(Post, { foreignKey: 'uid' })
Favorite.belongsTo(User, { as: 'u', foreignKey: 'uid' })

// export modules
module.exports = { User, Post, Plant, Favorite }

