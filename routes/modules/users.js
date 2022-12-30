const router = require('express').Router()

const {
  userClockIn,
  userClockOut,
  editUser,
} = require('../../controllers/users')

router.patch('/records/:recordId', userClockOut)
router.post('/records', userClockIn)

router.put('/:userId', editUser)

module.exports = router
