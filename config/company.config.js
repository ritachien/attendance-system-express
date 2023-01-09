const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

// calendar usage
const year = dayjs().tz('Asia/Taipei').year()

// account would be locked by continuously password error
const loginErrorLimit = 5

// attendance related
const minHour = 8
const attendanceStatus = {
  error: 0,
  ok: 1,
}

// 換日時間 (hour - 24小時制)
const changeDayUntil = 5

module.exports = {
  year,
  loginErrorLimit,
  minHour,
  attendanceStatus,
  changeDayUntil,
}
