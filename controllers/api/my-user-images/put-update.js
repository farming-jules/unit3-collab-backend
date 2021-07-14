const { check } = require('express-validator')

const { authenticateCurrentUserByToken, MulterParser, checkValidation } = require('../../_helpers')
const getUserImageById = require('../../_helpers/my-user-images/get-user-image-by-id')

const permittedParams = [
  "image"
]

const validation = [
  check('image').custom((value, { req }) => {
    return !!req?.file?.location
  }).withMessage('Image is Required')
]

const apiMyProfileUserImageUpdate = async function(req, res) {
  const { locals: { currentUserImage } } = res

  const userImage = await currentUserImage.update({ image: req.file.location }, { fields: permittedParams })
  res.status(200).json(userImage)
}

module.exports = [authenticateCurrentUserByToken('json'), getUserImageById, MulterParser.single('image'), validation, checkValidation, apiMyProfileUserImageUpdate]