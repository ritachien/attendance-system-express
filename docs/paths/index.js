//  auth
const adminLogin = require('./adminLogin')
const userLogin = require('./userLogin')
const getCurrentUser = require('./getCurrentUser')

// admin
const getUsers = require('./admin/getUsers')

// user
const editUser = require('./user/editUser')
const userClockIn = require('./user/userClockIn')
const userClockOut = require('./user/userClockOut')
const userGetRecords = require('./user/userGetRecords')

module.exports = {
  '/admin/login': adminLogin,
  '/users/login': userLogin,
  '/admin/users': getUsers,
  '/users/getCurrentUser': getCurrentUser,
  '/user': editUser,
  '/user/records': {
    ...userGetRecords,
    ...userClockIn,
  },
  '/user/records/{recordId}': userClockOut,
}
