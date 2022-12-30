const router = require('express').Router()
const {
  getUsers,
  editUser,
} = require('../../controllers/admin')

router.put('/users/:userId', editUser)
router.get('/users', getUsers)

module.exports = router
