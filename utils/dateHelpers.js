const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

const year = convertToTaipeiTime(new Date()).year()
const calendar = require(`../config/govCalendar/${year}.json`)
const { changeDayUntil } = require('../config/company.config')

function convertToTaipeiTime (time) {
  return dayjs(time).utc().add(8, 'hours')
}

function getRecordDate (time) {
  const day = convertToTaipeiTime(time)
  const hour = day.hour()
  if (hour < changeDayUntil) {
    return day.subtract(1, 'day').format('YYYY-MM-DD')
  }
  return day.format('YYYY-MM-DD')
}

function getDuration (start, end) {
  const ms = dayjs(end) - dayjs(start)
  return Math.floor(ms / 1000 / 60 / 60)
}

function isHoliday (date) {
  const index = date.replaceAll('-', '')
  return calendar[index].isHoliday
}

module.exports = {
  convertToTaipeiTime,
  getRecordDate,
  getDuration,
  isHoliday,
}
