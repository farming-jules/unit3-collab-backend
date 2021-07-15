const { body } = require('express-validator')

const { User } = require('../../../models')
const { authenticateCurrentUserByToken, MulterParser, checkValidation } = require('../../_helpers')

const permittedLikeParams = ['like', 'TargetId']

const validations = [
  body('TargetId').isInt().notEmpty().withMessage('TargetId cannot be empty'),
  body('like').isBoolean()
]

const apiMyLikesCreate = async function(req, res) {
  const { body } = req
  const { locals: { currentUser } } = res

  console.log(body)

  // const likeParams = {
  //   TargetId: 1,
  //   like: true // false
  // }

  const like = await currentUser.createLike(body, { fields: permittedLikeParams })

  let matched
  if (body.like) {
    matched = await User.findOne({
      order: [[User.UserImages, 'id', 'ASC']],
      include: [
        {
          association: User.OwnerLikes,
          where: {
            OwnerId: body.TargetId,
            TargetId: currentUser.id,
            like: true
          },
          attributes: []
        }, {
          association: User.UserImages,
          attributes: ['image']
        }
      ],
      attributes: ['id', 'name']
    })
  }

  res.status(200).json({ like, matched })
}

module.exports = [authenticateCurrentUserByToken('json'), MulterParser.none(), validations, checkValidation, apiMyLikesCreate]