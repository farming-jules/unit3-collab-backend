const { authenticateCurrentUserByToken } = require('../../_helpers')
const { Like, User } = require('../../../models')
const { Op } = require("sequelize")

const apiMyMatchesIndex = async function(req, res) {
  const { locals: { currentUser } } = res

  //findAll (ownerLikes) TargetIds where like = true
  let OwnerLikes = await Like.findAll({ where: { OwnerId: (currentUser.id), like: true }, raw: true, attributes: ['TargetId'] })
  TargetIds = OwnerLikes.map((x) => x.TargetId )

  //use TargetIds as OwnerIds to find TargetIds where TargetIds= 1, and like: true
  let matchedLikes = await Like.findAll({ where: { TargetId: (currentUser.id), like: true, OwnerId: { [Op.in]: TargetIds} }, raw: true })
  matchedLikeIds = matchedLikes.map((x) => x.OwnerId)

  let matches = await User.findAll({ where: { id: { [Op.in]:matchedLikeIds } },
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
    attributes: ['name'] })

  res.status(200).json(matches)
}

module.exports = [authenticateCurrentUserByToken('json'), apiMyMatchesIndex]
