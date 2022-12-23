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
          message: 'Account not exists.',
        })
      }

      // error password
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({
          status: 'error',
          message: 'Password incorrect.',
        })
      }

      // generate jwt token for valid inputs
      const payload = { id: user.id }
      const [token, exp] = generateToken(payload)
      delete user.password
      return res.status(200).json({
        status: 'success',
        message: `Login success. Token will be expired in ${exp}`,
        token,
        user,
      })
    } catch (err) {
      next(err)
    }
  },
}
