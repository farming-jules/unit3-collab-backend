const { User } = require('../../../models')
const { UserImage } = require('../../../models')

const { authenticateCurrentUserByToken } = require('../../_helpers')

const userSerializer = function(values) {
  const { ...user } = values.dataValues
  delete user.passwordHash
  return user
}

const apiMyProfileGet = async function(req, res) {
  const { locals: { currentUser } } = res

  res.status(200).json(userSerializer(currentUser))
}

module.exports = [authenticateCurrentUserByToken('json'), apiMyProfileGet]