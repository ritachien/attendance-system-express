const router = require('express').Router()
const { userLogin } = require('../controllers/users')
const { errorHandler } = require('../middleware/errorHandler')

router.post('/users/login', userLogin)
router.use('/', errorHandler)

module.exports = router
