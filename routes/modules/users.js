const router = require('express').Router()

const {
  userClockIn,
  userClockOut,
  editUser,
  getUserRecords,
} = require('../../controllers/users')

router.patch('/records/:recordId', userClockOut)
router.post('/records', userClockIn)

router.get('/:userId/records', getUserRecords)
router.put('/:userId', editUser)

module.exports = router
