const router = require('express').Router()
const adminControllers = require('../../controllers/admin')

router.get('/users', adminControllers.getUsers)

module.exports = router
