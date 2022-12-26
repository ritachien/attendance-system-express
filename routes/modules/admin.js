const router = require('express').Router()

router.get('/test', (req, res) => {
  return res.send('admin auth ok')
})

module.exports = router
