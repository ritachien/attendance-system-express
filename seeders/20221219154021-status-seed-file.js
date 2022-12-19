'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Statuses',
      ['error', 'ok'].map(name => {
        return {
          name,
          created_at: new Date(),
          updated_at: new Date(),
        }
      })
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Statuses', {})
  },
}
