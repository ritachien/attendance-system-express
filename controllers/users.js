const bcrypt = require('bcryptjs')
const { User } = require('../models')

const { generateToken } = require('../middleware/auth')

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
        message: 'Account not exists.',
      })
    }

    const user = result.dataValues
    // if account locked
    if (user.errorTimes === 5) {
      return res.status(403).json({
        status: 'error',
        message: 'Account locked. Please ask admin for help.',
      })
    }

    // error password => add 1 to errorTimes
    if (!bcrypt.compareSync(password, user.password)) {
      await result.increment('errorTimes')
      return res.status(401).json({
        status: 'error',
        message: 'Password incorrect.',
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
      message: `Login success. Token will be expired in ${exp}`,
      token,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  userLogin,
}
