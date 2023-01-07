const router = require('express').Router()

const isAllowedClock = require('../../middleware/isAllowedClock')

const {
  userClockIn,
  userClockOut,
  editUser,
  getUserRecords,
} = require('../../controllers/users')

router.patch('/records/:recordId', isAllowedClock, userClockOut)
router.post('/records', isAllowedClock, userClockIn)

router.get('/records', getUserRecords)
router.put('/', editUser)

module.exports = router
