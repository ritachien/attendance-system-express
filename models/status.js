'use strict'
const {
  Model,
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate (models) {
      Status.hasMany(models.Record, { foreignKey: 'statusId' })
    }
  }
  Status.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Status',
    tableName: 'Statuses',
    underscored: true,
  })
  return Status
}
