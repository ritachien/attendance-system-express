const {
  Model,
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      User.hasMany(models.Record, { foreignKey: 'userId' })
    }
  }
  User.init({
    account: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    errorTimes: DataTypes.TINYINT,
    isAdmin: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true,
  })
  return User
}
