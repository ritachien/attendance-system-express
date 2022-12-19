'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Records', 'status_id', {
      type: Sequelize.TINYINT,
      allowNull: false,
      references: {
        model: 'Statuses',
        key: 'id',
      },
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Records', 'status_id')
  },
}
