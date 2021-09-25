// require sequelize and database
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Plant extends Model { }

// Create table/coumns for Plant
Plant.init({
  officialName: DataTypes.STRING,
  nickName: DataTypes.STRING,
  photo: DataTypes.STRING,
  care: DataTypes.STRING,
  lastWatered: DataTypes.DATEONLY,
  nextWatering: DataTypes.DATEONLY,
  intervals: DataTypes.INTEGER
}, { sequelize, modelName: 'plant' })

// export Plant
module.exports = Plant
