const { body } = require('express-validator')

const { authenticateCurrentUserByToken } = require('../../_helpers')
const { User } = require('../../../models')

const apiMyRecommendations = async function(req, res) {
  const { body: userParams } = req
  const {
      locals: {
          currentUser: {
              lookingFor,
              location
            }
          }
        } = res

  console.log(res)

  const whereQuery = {
    location
  }

  if (lookingFor !== 'Everyone') {
    whereQuery.gender = lookingFor === 'Men' ? 'M' : 'F'
  }

  const showUsers = await User.findAll({ where: whereQuery })

  res.status(200).json(showUsers)
}

module.exports = [authenticateCurrentUserByToken('json'), apiMyRecommendations]