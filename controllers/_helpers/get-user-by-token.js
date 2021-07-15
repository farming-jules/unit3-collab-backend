const moment = require('moment')

const { AuthenticityToken, User } = require("../../models")

module.exports = async function (req, res, next) {
  const { session: { token } } = req

  if (token) {
    const authToken = await AuthenticityToken.findOne({
      where: { token },
      order: [[AuthenticityToken.User, User.UserImages, 'id', 'ASC']],
      include: {
        association: AuthenticityToken.User,
        include: User.UserImages
      }
    })

    if (authToken) {
      const currentDate = moment()
      const expireDate = moment(authToken.createdAt).add(7, 'days')
      if (!currentDate.isAfter(expireDate)) {
        res.locals.currentUser = authToken.User
      }
    }
  }

  if (res.locals.currentUser === undefined) {
    res.locals.currentUser = null
  }

  next()
}