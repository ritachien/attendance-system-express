const adminLogin = require('./adminLogin')
const getUsers = require('./admin/getUsers')
const getCurrentUser = require('./getCurrentUser')
const userLogin = require('./userLogin')

module.exports = {
  '/admin/login': adminLogin,
  '/users/login': userLogin,
  '/admin/users': getUsers,
  '/users/getCurrentUser': getCurrentUser,
}
