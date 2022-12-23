const adminLogin = require('./adminLogin')
const userLogin = require('./userLogin')

module.exports = {
  '/admin/login': adminLogin,
  '/users/login': userLogin,
}
