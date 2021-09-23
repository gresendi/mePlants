const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Favorite extends Model { }

Favorite.init({
  pid: {
    type: DataTypes.INTEGER,
    allowNull: false,

  }
}, { sequelize, modelName: 'favorite' })

module.exports = Favorite
