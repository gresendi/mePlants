const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Comment extends Model { }

Comment.init({
  pid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,  
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, { sequelize, modelName: 'comment' })

module.exports = Comment
