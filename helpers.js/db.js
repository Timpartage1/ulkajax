const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sql12741536', 'sql12741536', 'ks7R4j7Rh9', {
  host: 'sql12.freesqldatabase.com',
  dialect: 'mysql'
});


module.exports = sequelize;