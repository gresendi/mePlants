const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Comment extends Model { }

// create table/columns for comment
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

// export Comment
module.exports = Comment
