const dayjs = require('dayjs')
const { randomUUID } = require('crypto')

const validQRcode = new Map()

function qrGenerator () {
  const qrString = randomUUID()
  const halfHourLater = dayjs().add(0.5, 'hour')
  validQRcode.set(qrString, halfHourLater)
  return qrString
}

function qrValidator (qrString) {
  deleteExpired()
  return validQRcode.has(qrString)
}

function deleteExpired () {
  for (const [qrString, expiredAt] of validQRcode) {
    if (dayjs().isAfter(expiredAt)) {
      validQRcode.delete(qrString)
    }
  }
}

module.exports = {
  qrGenerator,
  qrValidator,
}
