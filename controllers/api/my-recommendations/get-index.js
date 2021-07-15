const { Op } = require('sequelize')
const { authenticateCurrentUserByToken } = require('../../_helpers')
const { User, Like } = require('../../../models')

const apiMyRecommendationsIndex = async function(req, res) {
  const {
    locals: {
      currentUser: {
        id,
        lookingFor,
        location
      }
    }
  } = res

  const likes = await Like.findAll({ where: { OwnerId: id }, attributes: ['TargetId'], raw: true })
  const likeIds = likes.map((like) => like.TargetId)

  const whereQuery = {
    id: {
      [Op.notIn]: [...likeIds, id]
    },
    location
  }

  if (lookingFor !== 'Everyone') {
    whereQuery.gender = lookingFor === 'Men' ? 'M' : 'F'
  }

  const showUsers = await User.findAll({ where: whereQuery })

  res.status(200).json(showUsers)
}

module.exports = [authenticateCurrentUserByToken('json'), apiMyRecommendationsIndex]