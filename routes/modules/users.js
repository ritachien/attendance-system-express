const router = require('express').Router()

const { userClockIn } = require('../../controllers/users')

router.post('/records', userClockIn)

module.exports = router
