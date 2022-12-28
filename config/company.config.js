// account would be locked by continuously password error
const loginErrorLimit = 5

// statuses of records
const attendanceStatus = {
  error: 0,
  ok: 1,
}

module.exports = {
  loginErrorLimit,
  attendanceStatus,
}
