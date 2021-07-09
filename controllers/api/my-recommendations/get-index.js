const { authenticateCurrentUserByToken } = require('../../_helpers')
const { User } = require('../../../models')

const apiMyRecommendationsIndex = async function(req, res) {
  const {
    locals: {
      currentUser: {
        lookingFor,
        location
      }
    }
  } = res

  const whereQuery = {
    location
  }

  if (lookingFor !== 'Everyone') {
    whereQuery.gender = lookingFor === 'Men' ? 'M' : 'F'
  }

  const showUsers = await User.findAll({ where: whereQuery })

  res.status(200).json(showUsers)
}

module.exports = [authenticateCurrentUserByToken('json'), apiMyRecommendationsIndex]