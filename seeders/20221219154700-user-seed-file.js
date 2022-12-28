'use strict'
const bcrypt = require('bcryptjs')
const { randomUUID } = require('crypto')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = Array.from({ length: 10 }).map((_, index) => {
      return {
        account: `user${index + 1}`,
        password: bcrypt.hashSync('titaner'),
        email: `user${index + 1}@example.com`,
        name: `user${index + 1}`,
        is_admin: false,
      }
    })
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          account: 'admin',
          password: bcrypt.hashSync('tiadmin'),
          email: 'admin@example.com',
          name: 'admin',
          is_admin: true,
        },
        ...users,
      ].map(user => {
        return {
          ...user,
          id: randomUUID(),
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
