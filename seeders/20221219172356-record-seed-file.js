'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { Status, User } = require('../models')
    const [user, status] = await Promise.all([
      User.findOne({ where: { account: 'user1' }, raw: true }),
      Status.findOne({ where: { name: 'error' }, raw: true }),
    ])

    await queryInterface.bulkInsert('Records',
      Array.from({ length: 5 }).map(item => {
        return {
          user_id: user.id,
          status_id: status.id,
          created_at: new Date(),
        }
      })
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Records', {})
  },
}
