const router = require('express').Router()
const {
  getUsers,
  editUser,
  addUser,
  getQrString,
} = require('../../controllers/admin')

router.put('/users/:userId', editUser)
router.post('/users', addUser)
router.get('/users', getUsers)
router.get('/qrcode', getQrString)

module.exports = router
