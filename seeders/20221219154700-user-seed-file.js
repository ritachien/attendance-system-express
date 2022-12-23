'use strict'
// const { v4: UUIDV4 } = require('uuid')
const bcrypt = require('bcryptjs')
const { randomUUID } = require('crypto')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
        {
          account: 'user1',
          password: bcrypt.hashSync('titaner'),
          email: 'user1@example.com',
          name: 'user1',
          is_admin: false,
        },
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
