const bcrypt = require('bcryptjs')

const { User } = require('../models')
const { generateToken } = require('../middleware/auth')
const { loginErrorLimit } = require('../config/company.config')

const userLogin = async (req, res, next) => {
  const { account, password } = req.body
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
}

module.exports = {
  userLogin,
}
