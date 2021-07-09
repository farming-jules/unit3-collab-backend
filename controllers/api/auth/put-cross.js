const { body } = require('express-validator')

const { User, Like } = require('../../../models')
const { authenticateCurrentUserByToken } = require('../../_helpers')

const permittedLikeParams = ['like', 'TargetId']

const apiAuthCross = async function(req, res) {
  const { body: userParams } = req
  const { locals: { currentUser, currentTarget } } = res

  console.log(res)

  const cross = await currentUser.createLike(userParams, { fields: permittedParams })
  await like.update({ TargetId: userParams, like: false })

  res.status(200).json(cross)
}

module.exports = [authenticateCurrentUserByToken('json'), apiAuthCross]
