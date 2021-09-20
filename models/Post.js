const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Post extends Model { }

Post.init({
  title: DataTypes.STRING,
  photo: DataTypes.BLOB,
  body: DataTypes.STRING
}, { sequelize, modelName: 'post' })

module.exports = Post
