const bcrypt = require('bcryptjs')

const { User, Record } = require('../models')
const { generateToken } = require('../middleware/auth')
const { loginErrorLimit, minHour, attendanceStatus } = require('../config/company.config')
const { getRecordDate, getDuration, isHoliday, isNotToday } = require('../utils/dateHelpers')

module.exports = {
  userLogin: async (req, res, next) => {
    const { account, password } = req.body
    if (!account || !password) {
      return res.status(400).json({
        status: 'error',
        message: '請填入所有必填欄位',
      })
    }

    const result = await User.findOne({
      where: {
        account,
        isAdmin: false,
      },
    })

    try {
      // user not found
      if (!result) {
        return res.status(401).json({
          status: 'error',
          message: '帳戶不存在',
        })
      }

      const user = result.dataValues
      // if account locked
      if (user.errorTimes === loginErrorLimit) {
        return res.status(403).json({
          status: 'error',
          message: '帳戶已上鎖，請尋求 Admin 協助。',
        })
      }

      // error password => add 1 to errorTimes
      if (!bcrypt.compareSync(password, user.password)) {
        await result.increment('errorTimes')
        const errorTryRemain = loginErrorLimit - user.errorTimes - 1
        return res.status(401).json({
          status: 'error',
          message: `密碼錯誤。\n連續錯誤 ${errorTryRemain} 次後帳戶自動上鎖。`,
        })
      }

      if (user.errorTimes !== 0) {
        await result.update({ errorTimes: 0 })
      }

      // generate jwt token for valid inputs
      const payload = {
        id: user.id,
        account: user.account,
        isAdmin: user.isAdmin,
      }
      const [token, exp] = generateToken(payload)

      return res.status(200).json({
        status: 'success',
        message: `登入成功。帳戶將在 ${exp} 後自動登出。`,
        token,
      })
    } catch (err) {
      next(err)
    }
  },
  userClockIn: async (req, res, next) => {
    try {
      // check input from front-end
      const { clockIn } = req.body
      if (!req.user.id || !clockIn) {
        return res.status(400).json({
          status: 'error',
          message: 'Require field missing',
        })
      }

      // check if isNotToday
      if (isNotToday(clockIn)) {
        return res.status(422).json({
          status: 'error',
          message: 'Cannot add a not today record',
        })
      }

      // calculate record 日期
      const date = getRecordDate(clockIn)

      // check if it's holiday
      if (isHoliday(date)) {
        return res.status(422).json({
          status: 'error',
          message: 'Today is not working day',
        })
      }

      // add a new record
      const newRecord = await Record.create({
        userId: req.user.id,
        date,
        clockIn,
      })

      // return data
      return res.status(200).json(newRecord)
    } catch (err) {
      next(err)
    }
  },
  userClockOut: async (req, res, next) => {
    try {
      // check input from front-end
      const { recordId } = req.params
      const { clockOut } = req.body
      if (!recordId || !clockOut) {
        return res.status(400).json({
          status: 'error',
          message: 'Require field missing',
        })
      }

      // check date
      if (isNotToday(clockOut)) {
        return res.status(422).json({
          status: 'error',
          message: 'Cannot add a not today record',
        })
      }

      // find record
      const result = await Record.findByPk(recordId)
      if (!result) {
        return res.status(404).json({
          status: 'error',
          message: 'Not found by provided recordId',
        })
      }

      const record = result.dataValues
      if (record.date !== getRecordDate(clockOut)) {
        return res.status(422).json({
          status: 'error',
          message: 'cannot clock out at different day',
        })
      }

      // update record
      const duration = getDuration(record.clockIn, clockOut)
      const status = duration >= minHour
        ? attendanceStatus.ok
        : attendanceStatus.error
      const updatedRecord = await result.update({
        duration,
        clockOut,
        status,
      })

      // return data
      return res.status(200).json({
        status: 'success',
        message: 'record updated',
        updatedRecord,
      })
    } catch (err) {
      next(err)
    }
  },
  editUser: async (req, res, next) => {
    try {
      const { userId } = req.params
      if (!userId) {
        return res.status(400).json({
          status: 'error',
          message: 'userId is required',
        })
      }

      const { account, password, passwordCheck, email } = req.body
      if (!account.trim() && !password.trim() && !email.trim()) {
        return res.status(400).json({
          status: 'error',
          message: 'no data provided',
        })
      }

      const originalUser = await User.findByPk(userId)
      if (!originalUser) {
        return res.status(404).json({
          status: 'error',
          message: `user of ${userId} not found`,
        })
      }

      const newData = { ...originalUser.dataValues }
      const errorMsg = []
      const columns = [ // 可更新項目
        {
          field: 'account',
          regex: /^\w{6,12}$/,
          value: account?.trim(),
        },
        {
          field: 'email',
          regex: /^[-\w.]+@([-\w]+\.)+[-\w]{2,4}$/,
          value: email?.trim(),
        },
        {
          field: 'password',
          regex: /^[\w!@#$%^&*]{6,20}$/,
          value: password?.trim(),
        },
      ]

      for (const { field, regex, value } of columns) {
        if (value) {
          // 檢查 account 是否重複
          if (field === 'account') {
            const duplicated = await User.findOne({ where: { account: value } })
            if (duplicated) {
              return res.status(422).json({
                status: 'error',
                message: `account: ${account} is occupied`,
              })
            }
          }

          // 檢查 password 是否與 passwordCheck 相同
          if (field === 'password' && value !== passwordCheck?.trim()) {
            errorMsg.push('password should equal to passwordCheck.')
          }

          // 項目格式檢查及內容更新
          if (regex.test(value)) {
            newData[field] = field === 'password' ? bcrypt.hashSync(value) : value
          } else {
            errorMsg.push(`invalid ${field} format.`)
          }
        }
      }

      // 回傳錯誤訊息
      if (errorMsg.length > 0) {
        return res.status(400).json({
          status: 'error',
          message: errorMsg,
        })
      }

      // 資料庫更新
      await originalUser.update({ ...newData })
      return res.status(200).json({
        status: 'success',
        message: 'user updated',
        user: {
          id: newData.id,
          account: newData.account,
          email: newData.email,
        },
      })
    } catch (err) {
      next(err)
    }
  },
}
