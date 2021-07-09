const { authenticateCurrentUserByToken } = require('../../_helpers')

const apiMyProfileDestroy = async function(req, res) {
  const { locals: { currentUser } } = res

  await currentUser.destroy()

  res.status(204).json()
}

module.exports = [authenticateCurrentUserByToken('json'), apiMyProfileDestroy]