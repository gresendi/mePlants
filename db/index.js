// require sequelize
const { Sequelize } = require('sequelize')

// export seqeuelize and pass connection (use JAWSDB for hosted on Heroku or local host)
module.exports = new Sequelize(process.env.JAWSDB_URL || process.env.LOCAL_URL)