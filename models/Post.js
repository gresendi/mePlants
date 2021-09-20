const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Post extends Model { }

Post.init({
  title: DataTypes.STRING,
  img: DataTypes.LONGBLOB,
  body: DataTypes.STRING
}, { sequelize, modelName: 'post' })

module.exports = Post
