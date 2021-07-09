const { body } = require('express-validator')

const { User, Like } = require('../../../models')
const { authenticateCurrentUserByToken } = require('../../_helpers')

const permittedLikeParams = ['like', 'TargetId']

const apiMyProfileLike = async function(req, res) {
  const { body: userParams } = req
  const { locals: { currentUser } } = res

  console.log(req)



  // const like = await currentUser.createLike( userParams, { fields: permittedLikeParams })
  // await like.update({ currentUser, like: true })

  // res.status(200).json(like)
}

module.exports = [authenticateCurrentUserByToken('json'), apiMyProfileLike]


