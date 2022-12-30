const router = require('express').Router()
const {
  getUsers,
  editUser,
  addUser,
} = require('../../controllers/admin')

router.put('/users/:userId', editUser)
router.post('/users', addUser)
router.get('/users', getUsers)

module.exports = router
