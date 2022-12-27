const bcrypt = require('bcryptjs')
const { User } = require('../models')

const { generateToken } = require('../middleware/auth')

module.exports = {
  adminLogin: async (req, res, next) => {
    const { account, password } = req.body
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

      return res.status(200).json(users)
    } catch (err) {
      next(err)
    }
  },
}
