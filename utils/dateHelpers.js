const dayjs = require('dayjs')
const isToday = require('dayjs/plugin/isToday')
dayjs.extend(isToday)

const { changeDayUntil, year } = require('../config/company.config')
const calendar = require(`../config/govCalendar/${year}.json`)

function getRecordDate (date) {
  // get hour of local time
  const hour = dayjs(date).hour()

  if (hour < changeDayUntil) {
    return dayjs(date).subtract(1, 'day')
  }
  return date
}

function getDuration (start, end) {
  const ms = dayjs(end) - dayjs(start)
  return Math.floor(ms / 1000 / 60 / 60)
}

function isHoliday (date) {
  const index = dayjs(date).format('YYYYMMDD')
  return calendar[index].isHoliday
}

function isNotToday (date) {
  return !dayjs(date).isToday()
}

module.exports = {
  getRecordDate,
  getDuration,
  isHoliday,
  isNotToday,
}
