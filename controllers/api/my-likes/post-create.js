const { body } = require('express-validator')

const { authenticateCurrentUserByToken } = require('../../_helpers')

const permittedLikeParams = ['like', 'TargetId']

const validations = [
  body('TargetId').isString().notEmpty().withMessage('TargetId cannot be empty'),
  body('like').isBoolean()
]

const apiMyLikesCreate = async function(req, res) {
  const { body } = req
  const { locals: { currentUser } } = res

  // const likeParams = {
  //   TargetId: 1,
  //   like: true // false
  // }

  const like = await currentUser.createLike(body, { fields: permittedLikeParams })

  res.status(200).json(like)
}

module.exports = [authenticateCurrentUserByToken('json'), apiMyLikesCreate]