// require sequelize and database and passport (for auth)
const pls = require('passport-local-sequelize')
const { DataTypes } = require('sequelize')
const sequelize = require('../db')

// class User extends Model { }

// User.init({
//   username: DataTypes.STRING
// }, { sequelize, modelName: 'user' })

// const User = pls.defineUser(sequelize, { username: DataTypes.STRING })

// Create table/columns for user (for auth)
const User = pls.defineUser(sequelize, { username: { type: DataTypes.STRING, unique: true }})

// export User
module.exports = User

