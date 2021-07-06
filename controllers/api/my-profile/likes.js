const { body } = require('express-validator')
const { Like } = require('../../models')

const { authenticateCurrentUserByToken } = require('../../_helpers')

const permittedParams = [
  'TargetId',
  'like'
]

const apiMyLikesUpdate = async function(req, res) {
  const { body: userParams } = req
  const { locals: { currentUser } } = res

  const like = await currentUser.createLike(userParams, { fields: permittedParams })
  await like.update({ TargetId:  , like: true })

  res.status(200).json(like)
}

module.exports = [authenticateCurrentUserByToken('json'), apiMyLikesUpdate]