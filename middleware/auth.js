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

const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token === null) {
    return res.status(401).json({
      status: 'error',
      message: 'Please login first.',
    })
  }

  jwt.verify(token, process.env.AUTH_PRIVATE, (err, user) => {
    if (err) {
      return res.status(401).json({
        status: 'error',
        message: `${err.name}: ${err.message}`,
      })
    }

    req.user = user
    next()
  })
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next()
  return res.status(403).json({
    status: 'error',
    message: 'Not an admin, permission denied',
  })
}

const isUser = (req, res, next) => {
  if (req.user && !req.user.isAdmin) return next()
  return res.status(403).json({
    status: 'error',
    message: 'Not a user, permission denied',
  })
}

module.exports = {
  generateToken,
  authToken,
  isAdmin,
  isUser,
}
