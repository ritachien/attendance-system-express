//  auth
const adminLogin = require('./adminLogin')
const userLogin = require('./userLogin')
const getCurrentUser = require('./getCurrentUser')

// admin
const getUsers = require('./admin/getUsers')
const adminEditUser = require('./admin/adminEditUser')

// user
const editUser = require('./user/editUser')
const userClockIn = require('./user/userClockIn')
const userClockOut = require('./user/userClockOut')
const userGetRecords = require('./user/userGetRecords')

module.exports = {
  //  auth
  '/admin/login': adminLogin,
  '/users/login': userLogin,
  '/users/getCurrentUser': getCurrentUser,
  // admin
  '/admin/users': getUsers,
  '/admin/users/{userId}': adminEditUser,
  // user
  '/user': editUser,
  '/user/records': {
    ...userGetRecords,
    ...userClockIn,
  },
  '/user/records/{recordId}': userClockOut,
}
