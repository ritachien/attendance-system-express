const router = require('express').Router()

router.post('/users/login', (req, res) => {
  res.status(200).send('Hello world')
})

module.exports = router
