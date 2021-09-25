// require sequelize and database
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Post extends Model { }

// Create table/columns for Post
Post.init({
  title: DataTypes.STRING,
  photo: DataTypes.STRING,
  body: DataTypes.STRING,
}, { sequelize, modelName: 'post' })

// export Post
module.exports = Post
