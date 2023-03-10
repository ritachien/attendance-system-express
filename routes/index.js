const router = require('express').Router()
const admin = require('./modules/admin')
const users = require('./modules/users')
const { userLogin, getCurrentUser } = require('../controllers/users')
const { adminLogin } = require('../controllers/admin')
const { errorHandler } = require('../middleware/errorHandler')
const { authToken, isAdmin, isUser } = require('../middleware/auth')

// access with out login
router.post('/admin/login', adminLogin)
router.post('/users/login', userLogin)

// access after login
router.get('/users/getCurrentUser', authToken, getCurrentUser)

// access with certain role
router.use('/admin', authToken, isAdmin, admin)
router.use('/user', authToken, isUser, users)

router.use('/', errorHandler)

module.exports = router
