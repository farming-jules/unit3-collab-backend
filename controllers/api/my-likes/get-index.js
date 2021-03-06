const { User } = require('../../../models')

const { authenticateCurrentUserByToken } = require('../../_helpers')

const apiMyLikesIndex = async function(req, res) {
  const { locals: { currentUser } } = res

  //only show OwnerId.name and the first uploaded img
  const UsersLikingCurrentUser = await User.findAll({
    order: [[User.UserImages, 'id', 'ASC']],
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
        attributes: ['image']
      }
    ],
    attributes: ['id', 'name']
  })


  res.status(200).json(UsersLikingCurrentUser)
}

module.exports = [authenticateCurrentUserByToken('json'), apiMyLikesIndex]