require('dotenv').config()
const jwt = require('jsonwebtoken')

const options = {
  expiresIn: '4h',
}

const generateToken = (payload) => {
  return [
    jwt.sign(payload, process.env.AUTH_PRIVATE, options),
    options.expiresIn,
  ]
}

module.exports = {
  generateToken,
}
