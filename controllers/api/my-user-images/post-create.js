// case 1 - if no entry id > create
const { check } = require('express-validator')
const { User } = require('../../../models')
const { authenticateCurrentUserByToken, MulterParser, checkValidation } = require('../../_helpers')

const permittedParams = [
  "image"
]

const validation = [
  check('image').custom((value, { req }) => {
    return !!req?.file?.location
  }).withMessage('Image is Required'),
  check('image-length').custom(async (value, { req: { res }}) => {
    const { locals: { currentUser } } = res

    const userImages = await currentUser.getUserImages({ raw: true })
    return userImages.length <= 5
  }).withMessage('You already have max images')
]

const apiMyProfileUserImageCreate = async function(req, res) {
  const { locals: { currentUser } } = res

  const userImage = await currentUser.createUserImage({ image: req.file.location }, { fields: permittedParams })
  res.status(200).json(userImage)
}

module.exports = [authenticateCurrentUserByToken('json'), MulterParser.single('image'), validation, checkValidation, apiMyProfileUserImageCreate]