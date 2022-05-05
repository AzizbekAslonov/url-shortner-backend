const { sequelize, DataTypes } = require('./db')

const User = sequelize.define('user', {
   email: {
      type: DataTypes.STRING,
      unique: true
   },
   password: DataTypes.STRING,
})

const Url = sequelize.define('url', {
   link: DataTypes.STRING,
   code: DataTypes.STRING,
   shortLink: {
      type: DataTypes.STRING,
      unique: true,
   },
   date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
   },
   clicks: {
      type: DataTypes.INTEGER,
      defaultValue: 0
   }
})

User.hasMany(Url, { onDelete: 'CASCADE' })
Url.belongsTo(User)

module.exports = { User, Url }