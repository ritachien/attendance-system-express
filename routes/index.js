const router = require('express').Router()
const admin = require('./modules/admin')
const users = require('./modules/users')
const { userLogin } = require('../controllers/users')
const { adminLogin } = require('../controllers/admin')
const { errorHandler } = require('../middleware/errorHandler')
const { authToken, isAdmin, isUser } = require('../middleware/auth')

router.post('/admin/login', adminLogin)
router.post('/users/login', userLogin)

router.use('/admin', authToken, isAdmin, admin)
router.use('/users', authToken, isUser, users)
router.use('/', errorHandler)

module.exports = router
