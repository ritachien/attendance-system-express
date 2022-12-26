const router = require('express').Router()

router.post('/test', (req, res) => {
  res.send('user OK')
})

module.exports = router
