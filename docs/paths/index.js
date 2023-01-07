//  auth
const adminLogin = require('./adminLogin')
const userLogin = require('./userLogin')
const getCurrentUser = require('./getCurrentUser')

// admin
const addUser = require('./admin/addUser')
const adminEditUser = require('./admin/adminEditUser')
const getQrString = require('./admin/getQrString')
const getUsers = require('./admin/getUsers')

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
  '/admin/qrcode': getQrString,
  '/admin/users': {
    ...getUsers,
    ...addUser,
  },
  '/admin/users/{userId}': adminEditUser,
  // user
  '/user': editUser,
  '/user/records': {
    ...userGetRecords,
    ...userClockIn,
  },
  '/user/records/{recordId}': userClockOut,
}
