const { body } = require('express-validator')

const { User, Like } = require('../../../models')
const { authenticateCurrentUserByToken } = require('../../_helpers')

const permittedLikeParams = ['like', 'TargetId']

const apiAuthLike = async function(req, res) {
  const { body: userParams } = req
  const { locals: { currentUser, currentTarget } } = res

  console.log(res)

  const like = await currentUser.createLike(userParams, { fields: permittedParams })
  await like.update({ TargetId: userParams, like: true })

  res.status(200).json(like)
}

module.exports = [authenticateCurrentUserByToken('json'), apiAuthLike]
