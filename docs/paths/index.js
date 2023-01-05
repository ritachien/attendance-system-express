const adminLogin = require('./adminLogin')
const getCurrentUser = require('./getCurrentUser')
const userLogin = require('./userLogin')

module.exports = {
  '/admin/login': adminLogin,
  '/users/login': userLogin,
  '/users/getCurrentUser': getCurrentUser,
}
