const config = require("config");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
   config.get('DB_URL'),
   {
      logging: false,
      define: {
         timestamps: false,
      }
   }
)

module.exports = { sequelize, DataTypes }