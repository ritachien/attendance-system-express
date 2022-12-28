const router = require('express').Router()

const { userClockIn, userClockOut } = require('../../controllers/users')

router.patch('/records/:recordId', userClockOut)
router.post('/records', userClockIn)

module.exports = router
