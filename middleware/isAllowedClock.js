const { distanceTo } = require('geolocation-utils')
const { qrValidator } = require('../utils/qrHelpers')

function isAllowedClock (req, res, next) {
  const { position, qrString } = req.body
  if (!position && !qrString) {
    return res.status(403).json({
      status: 'error',
      message: 'should provide either position or qrString',
    })
  }

  if (position && isInRange(position)) {
    return next()
  }

  if (qrString && isValidQr(qrString)) {
    return next()
  }

  return res.status(403).json({
    status: 'error',
    message: 'not allowed to clock',
  })
}

function isInRange (position) {
  const placesAllowToClock = [
    {
      // 新加坡商鈦坦科技
      lat: 25.057640384418786,
      lng: 121.61235508426716,
    },
    {
      // ALPHA Camp
      lat: 25.05599234479154,
      lng: 121.5443365400908,
    },
  ]

  const { lat, lng } = position
  if (!(lat && lng)) return false
  const allowedDistance = 400 // 公尺
  let isInRange = false
  for (const place of placesAllowToClock) {
    const distance = distanceTo(position, place)
    if (distance <= allowedDistance) {
      isInRange = true
      return isInRange
    }
  }
}

function isValidQr (string) {
  return qrValidator(string)
}

module.exports = isAllowedClock
