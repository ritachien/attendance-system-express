const adminLogin = require('./adminLogin')
const getUsers = require('./admin/getUsers')
const getCurrentUser = require('./getCurrentUser')
const userClockIn = require('./user/userClockIn')
const userClockOut = require('./user/userClockOut')
const userGetRecords = require('./user/userGetRecords')
const userLogin = require('./userLogin')

module.exports = {
  '/admin/login': adminLogin,
  '/users/login': userLogin,
  '/admin/users': getUsers,
  '/users/getCurrentUser': getCurrentUser,
  '/user/records': {
    ...userGetRecords,
    ...userClockIn,
  },
  '/user/records/{recordId}': userClockOut,
}
