const moment = require('moment')
const { randomUUID } = require('crypto')

const validQRcode = new Map()

function qrGenerator () {
  const qrString = randomUUID()
  const aMinuteLater = moment().tz('Asia/Taipei').add(1, 'minute')
  validQRcode.set(qrString, aMinuteLater)
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
