const { body } = require('express-validator')

const { User, Like } = require('../../../models')
const { authenticateCurrentUserByToken } = require('../../_helpers')

const permittedParams = ['like', 'TargetId']

const apiMyProfileDislike = async function(req, res) {
  const { body: userParams } = req
  const { locals: { currentUser } } = res

  // console.log(req)

  const clickDislike = await currentUser.createLike( {body: userParams}, { fields: permittedParams })
  await clickDislike.update({ currentUser, like: false })

  res.status(200).json(clickDislike)
}

module.exports = [authenticateCurrentUserByToken('json'), apiMyProfileDislike]