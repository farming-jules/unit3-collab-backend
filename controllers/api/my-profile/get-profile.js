const { User } = require('../../../models')
const { UserImage } = require('../../../models')

const { authenticateCurrentUserByToken } = require('../../_helpers')

const apiMyProfileGet = async function(req, res) {
  const { locals: { currentUser } } = res
  const { body: userParams } = req
  res.render('api/my/profile', { req }),

}

module.exports = [authenticateCurrentUserByToken('json'), apiMyProfileGet]