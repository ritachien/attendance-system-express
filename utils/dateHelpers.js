const dayjs = require('dayjs')
const isToday = require('dayjs/plugin/isToday')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isToday)

const { changeDayUntil, year } = require('../config/company.config')
const calendar = require(`../config/govCalendar/${year}.json`)

function formatInTaipeiTime (date) {
  return dayjs(date).tz('Asia/Taipei')
}

function getRecordDate (date) {
  // get hour of local time
  const hour = dayjs(date).hour()

  if (hour < changeDayUntil) {
    return dayjs(date).subtract(1, 'day').format('YYYY-MM-DD')
  }
  return dayjs(date).format('YYYY-MM-DD')
}

function getDuration (start, end) {
  const ms = dayjs(end) - dayjs(start)
  return Math.floor(ms / 1000 / 60 / 60)
}

function isHoliday (date) {
  const index = dayjs(date).format('YYYYMMDD')
  console.log(date, index)
  return calendar[index].isHoliday
}

module.exports = {
  formatInTaipeiTime,
  getRecordDate,
  getDuration,
  isHoliday,
}
