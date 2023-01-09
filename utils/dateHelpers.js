const moment = require('moment')

const { changeDayUntil, year } = require('../config/company.config')
const calendar = require(`../config/govCalendar/${year}.json`)

function formatInTaipeiTime (date) {
  return moment(date).tz('Asia/Taipei')
}

function getRecordDate (date) {
  const day = moment(date).tz('Asia/Taipei')
  const hour = day.hour()

  if (hour < changeDayUntil) {
    return day.subtract(1, 'day').format('YYYY-MM-DD')
  }
  return day.format('YYYY-MM-DD')
}

function getDuration (start, end) {
  const ms = moment(end) - moment(start)
  return Math.floor(ms / 1000 / 60 / 60)
}

function isHoliday (date) {
  const index = moment(date).tz('Asia/Taipei').format('YYYYMMDD')
  return calendar[index].isHoliday
}

module.exports = {
  formatInTaipeiTime,
  getRecordDate,
  getDuration,
  isHoliday,
}
