'use strict'
const { v4: UUIDV4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          account: 'admin',
          password: 'tiadmin',
          email: 'admin@example.com',
          name: 'admin',
        },
        {
          account: 'user1',
          password: 'titaner',
          email: 'user1@example.com',
          name: 'user1',
        },
      ].map(user => {
        return {
          id: UUIDV4(),
          account: user.account,
          password: user.password,
          email: user.email,
          name: user.name,
          created_at: new Date(),
          updated_at: new Date(),
        }
      })
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {})
  },
}
