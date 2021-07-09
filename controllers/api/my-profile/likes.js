const { body } = require('express-validator')
const { User } = require('../../../models')

const { authenticateCurrentUserByToken } = require('../../_helpers')

const apiMyLikesGet = async function(req, res) {
  const { locals: { currentUser } } = res

  //only wanna show OwnerId.name and the first uploaded img
  const UsersLikingCurrentUser = await User.findAll({
    include: [
      {
        association: User.OwnerLikes,
        where: {
          TargetId: (currentUser.id),
          like: true,
        },
        attributes: []
      },
      {
        association: User.UserImages,
        attributes: ['image'],
        limit: 1
      }
    ],
    attributes: ['name']
  })


  res.status(200).json(UsersLikingCurrentUser)
}

module.exports = [authenticateCurrentUserByToken('json'), apiMyLikesGet]