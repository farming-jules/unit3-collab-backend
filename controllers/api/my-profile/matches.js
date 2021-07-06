const { authenticateCurrentUserByToken } = require('../../_helpers')
const { Like } = require('../../../models')
const { User } = require('../../../models')
const { Op } = require("sequelize")

const apiMyMatchesUpdate = async function(req, res) {
  const { params: { id } } = req
  const { locals: { currentUser } } = res

  //findAll (ownerLikes) TargetIds where like = true
  let OwnerLikes = await Like.findAll({ where: { OwnerId: 1, like: true }, raw: true, attributes: ['TargetId'] })
  TargetIds = OwnerLikes.map((x) => x.TargetId )
  //use TargetIds as OwnerIds to find TargetIds where TargetIds= 1, and like: true
  let matchedLikes = await Like.findAll({ where: { TargetId: currentUser, like: true, OwnerId: { [Op.in]: TargetIds} }, raw: true })
  matchedLikeIds = matchedLikes.map((x) => x.OwnerId)

  let matches = await User.findAll({ where: { id: { [Op.in]:matchedLikeIds } }, raw: true })

  res.status(200).json(matches)
}

module.exports = [authenticateCurrentUserByToken('json'), apiMyMatchesUpdate]