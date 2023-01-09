const { readFileSync, writeFileSync, rmSync } = require('node:fs')
const path = require('node:path')

const { year } = require('../config/company.config')
// 取得並產出新年度資料
const inputFile = path.join(__dirname, `../config/govCalendar/${year + 1}.csv`)
const outputFile = path.join(__dirname, `../config/govCalendar/${year + 1}.json`)

function generateCalendar (year) {
  try {
    const fileContent = readFileSync(inputFile, 'utf8')
    const lines = fileContent.split(/\r?\n/)
    const obj = {}
    lines.map(line => {
      // analyze line by regex
      const reg = /(?<day>[0-9]{8}),(?<week>[日一二三四五六]{1}),(?<isHoliday>[02]{1}),(?<description>.*)/
      // const result = line.match(reg).groups
      const { day, week, isHoliday, description } = line.match(reg).groups
      obj[day] = {
        week,
        isHoliday: Boolean(Number(isHoliday)),
        description,
      }
      return obj
    })

    writeFileSync(outputFile, JSON.stringify({ ...obj }))
    // 刪除前一年資料
    rmSync(path.join(__dirname, `../config/govCalendar/${year - 1}.json`))
    rmSync(path.join(__dirname, `../config/govCalendar/${year - 1}.csv`))
    return
  } catch (err) {
    console.error(err)
  }
}

generateCalendar(year)
