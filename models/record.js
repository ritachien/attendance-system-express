const {
  Model,
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    static associate (models) {
      Record.belongsTo(models.Status, { foreignKey: 'statusId' })
      Record.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Record.init({
    duration: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Record',
    tableName: 'Records',
    underscored: true,
  })
  return Record
}
