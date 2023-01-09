const bcrypt = require('bcryptjs')
const { randomUUID } = require('crypto')

const { User } = require('../models')
const { generateToken } = require('../middleware/auth')
const { loginErrorLimit } = require('../config/company.config')
const { qrGenerator } = require('../utils/qrHelpers')

module.exports = {
  adminLogin: async (req, res, next) => {
    const { account, password } = req.body
    if (!account || !password) {
      return res.status(400).json({
        status: 'error',
        message: '請填入所有必填欄位',
      })
    }

    const user = await User.findOne({
      raw: true,
      where: {
        account,
        isAdmin: true,
      },
    })

    try {
      // admin not found
      if (!user) {
        return res.status(401).json({
          message: '帳戶不存在',
        })
      }

      // error password
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({
          status: 'error',
          message: '密碼錯誤',
        })
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
        user: {
          id: user.id,
          name: user.name,
          account: user.account,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      })
    } catch (err) {
      next(err)
    }
  },
  getUsers: async (req, res, next) => {
    try {
      const users = await User.findAll({
        raw: true,
        where: {
          isAdmin: false,
        },
        attributes: [
          'id', 'account', 'name', 'email', 'errorTimes',
        ],
      })

      return res.status(200).json({
        status: 'success',
        message: 'search success',
        users,
      })
    } catch (err) {
      next(err)
    }
  },
  editUser: async (req, res, next) => {
    try {
      const { unlock, resetPassword } = req.body
      if (!unlock && !resetPassword) {
        return res.status(200).json({
          status: '200',
          message: 'no data need to update',
        })
      }

      const { userId } = req.params
      if (!userId) {
        return res.status(400).json({
          status: 'error',
          message: 'userId is required',
        })
      }

      const originalData = await User.findByPk(userId)
      if (!originalData) {
        return res.status(404).json({
          status: 'error',
          message: `user of ${userId} not found`,
        })
      }

      const newData = { ...originalData.dataValues }
      if (newData.errorTimes >= loginErrorLimit && unlock) {
        newData.errorTimes = 0
      }
      if (resetPassword) {
        newData.password = bcrypt.hashSync('titaner')
      }

      await originalData.update({ ...newData })
      return res.status(200).json({
        status: 'success',
        message: 'update success',
      })
    } catch (err) {
      next(err)
    }
  },
  addUser: async (req, res, next) => {
    const { account, name, email } = req.body
    if (!account.trim() || !name.trim() || !email.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'missing required fields',
      })
    }

    const errorMsg = []
    const columns = [ // 可更新項目
      {
        field: 'account',
        regex: /^\w{5,12}$/,
        value: account?.trim(),
      },
      {
        field: 'email',
        regex: /^[-\w.]+@([-\w]+\.)+[-\w]{2,4}$/,
        value: email?.trim(),
      },
      {
        field: 'name',
        regex: /^.+$/,
        value: name?.trim(),
      },
    ]
    const newData = {}

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

        // 項目格式檢查及內容更新
        if (regex.test(value)) {
          newData[field] = value
        } else {
          errorMsg.push(`invalid ${field} format.`)
        }
      }
    }

    const user = await User.create({
      id: randomUUID(),
      account: newData.account,
      name: newData.name,
      email: newData.email,
      password: bcrypt.hashSync('titaner'),
    })

    const rawData = user.dataValues

    return res.status(200).json({
      status: 'success',
      message: 'user created',
      user: {
        id: rawData.id,
        account: rawData.account,
        name: rawData.name,
        email: rawData.email,
      },
    })
  },
  getQrString: async (req, res, next) => {
    const qrString = qrGenerator()
    return res.status(200).json({
      status: 'success',
      message: 'qrString generated',
      data: qrString,
    })
  },
}
