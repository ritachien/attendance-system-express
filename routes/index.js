const router = require('express').Router()
const { userLogin } = require('../controllers/users')
const { adminLogin } = require('../controllers/admin')
const { errorHandler } = require('../middleware/errorHandler')

router.post('/admin/login', adminLogin)
router.post('/users/login', userLogin)
router.use('/', errorHandler)

module.exports = router
