const {
  Model,
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    static associate (models) {
      Record.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Record.init({
    date: DataTypes.DATEONLY,
    clockIn: DataTypes.DATE,
    clockOut: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    status: DataTypes.TINYINT,
  }, {
    sequelize,
    modelName: 'Record',
    tableName: 'Records',
    underscored: true,
  })
  return Record
}
