// calendar usage
const year = 2022

// account would be locked by continuously password error
const loginErrorLimit = 5

// statuses of records
const attendanceStatus = {
  error: 0,
  ok: 1,
}

// 換日時間 (hour - 24小時制)
const changeDayUntil = 5

module.exports = {
  year,
  loginErrorLimit,
  attendanceStatus,
  changeDayUntil,
}
