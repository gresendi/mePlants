const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Plant extends Model { }

Plant.init({
  officialName: DataTypes.STRING,
  nickName: DataTypes.STRING,
  photo: DataTypes.STRING,
  care: DataTypes.STRING,
  lastWatered: DataTypes.DATEONLY,
  nextWatering: DataTypes.DATEONLY
}, { sequelize, modelName: 'plant' })

module.exports = Plant
