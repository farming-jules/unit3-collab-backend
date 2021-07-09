const { body } = require('express-validator')

const { User, Like } = require('../../../models')
const { authenticateCurrentUserByToken } = require('../../_helpers')

const permittedLikeParams = ['like', 'TargetId']

const apiMyProfileLike = async function(req, res) {
  const { body: userParams } = req
  const { locals: { currentUser } } = res

  // console.log(req)

  const clickLike = await currentUser.createLike({ body: userParams }, { fields: permittedLikeParams })
  await clickLike.update({ currentUser, like: true })

  res.status(200).json(clickLike)
}

module.exports = [authenticateCurrentUserByToken('json'), apiMyProfileLike]