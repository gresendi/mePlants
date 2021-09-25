// require sequelize and database
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Favorite extends Model { }

// Create table/columns for Favorite
Favorite.init({
  pid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey:true

  },
  uid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true

  }
}, { sequelize, modelName: 'favorite' })

// export Favorite
module.exports = Favorite
