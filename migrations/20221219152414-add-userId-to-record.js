'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Records', 'user_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Records', 'user_id')
  },
}
