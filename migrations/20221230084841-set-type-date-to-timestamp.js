'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'created_at', {
      type: 'TIMESTAMP',
    })
    await queryInterface.changeColumn('Users', 'updated_at', {
      type: 'TIMESTAMP',
    })
    await queryInterface.changeColumn('Records', 'created_at', {
      type: 'TIMESTAMP',
    })
    await queryInterface.changeColumn('Records', 'updated_at', {
      type: 'TIMESTAMP',
    })
    await queryInterface.changeColumn('Records', 'clock_in', {
      type: 'TIMESTAMP',
      allowNull: false,
    })
    await queryInterface.changeColumn('Records', 'clock_out', {
      type: 'TIMESTAMP',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'created_at', {
      type: Sequelize.DATE,
    })
    await queryInterface.changeColumn('Users', 'updated_at', {
      type: Sequelize.DATE,
    })
    await queryInterface.changeColumn('Records', 'created_at', {
      type: Sequelize.DATE,
    })
    await queryInterface.changeColumn('Records', 'updated_at', {
      type: Sequelize.DATE,
    })
    await queryInterface.changeColumn('Records', 'clock_in', {
      type: Sequelize.DATE,
      allowNull: false,
    })
    await queryInterface.changeColumn('Records', 'clock_out', {
      type: Sequelize.DATE,
    })
  },
}
