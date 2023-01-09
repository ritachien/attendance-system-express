const moment = require('moment')
const { randomUUID } = require('crypto')

const validQRcode = new Map()

function qrGenerator () {
  const qrString = randomUUID()
  const halfHourLater = moment().tz('Asia/Taipei').add(0.5, 'hour')
  validQRcode.set(qrString, halfHourLater)
  return qrString
}

function qrValidator (qrString) {
  deleteExpired()
  return validQRcode.has(qrString)
}

function deleteExpired () {
  for (const [qrString, expiredAt] of validQRcode) {
    if (moment().tz('Asia/Taipei').isAfter(expiredAt)) {
      validQRcode.delete(qrString)
    }
  }
}

module.exports = {
  qrGenerator,
  qrValidator,
}
