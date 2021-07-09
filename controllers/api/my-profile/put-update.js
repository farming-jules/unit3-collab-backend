const { body, check } = require('express-validator')

const { authenticateCurrentUserByToken, MulterParser, checkValidation } = require('../../_helpers')
const { User, UserImage } = require('../../../models')

const permittedParams = [
  "name",
  "dateOfBirth",
  "gender",
  "sexualOrientation",
  "passion",
  "lookingFor",
  "location",
  "bio"
]

const validation = [
  body('name').isString().withMessage('Name must be a String').notEmpty().withMessage('Name cannot be empty'),
  body('dateOfBirth').toDate().notEmpty().withMessage('Date cannot be empty'),
  body('gender').isString().withMessage('Gender must be a String').notEmpty().withMessage('Gender cannot be empty'),
  body('sexualOrientation').isString().withMessage('Sexual Orientation must be a String').notEmpty().withMessage('Sexual Orientation cannot be empty'),
  body('passion').isString().withMessage('Passion must be a String').notEmpty().withMessage('Passion cannot be empty'),
  body('lookingFor').isString().withMessage('Looking For must be a String').notEmpty().withMessage('Looking For cannot be empty'),
  body('location').isString().withMessage('Location must be a String').notEmpty().withMessage('Location cannot be empty'),
  body('bio').isString().withMessage('bio must be a String').notEmpty().withMessage('bio cannot be empty'),
  check('UserImages').custom((value, { req }) => {
    const { body: { UserImages }} = req
    const filesKeys = Object.keys(req.files || {})

    const filesLength = filesKeys.length || 0
    const imagesLength = (UserImages && UserImages.length) || 0

    if (filesLength + imagesLength < 1) return false

    return true
  }).withMessage('You need to put at least 1 image')
]

const apiMyProfileUpdate = async function(req, res) {
  const { locals: { currentUser } } = res
  const { body: userParams } = req

  await currentUser.update(userParams, { fields: permittedParams })

  if (userParams.UserImages && userParams.UserImages.length > 0) {
    const images = await currentUser.getUserImages({ raw: true })
    await UserImage.destroy({ where: { UserId: currentUser.id }})

    if (userParams.UserImages && userParams.UserImages.length > 0) {
      for (let i = 0; i < userParams.UserImages.length; i++) {
        const { id } = userParams.UserImages[i]
        const foundUserImage = images.find((image) => image.id == id)

        if (foundUserImage) {
          await currentUser.createUserImage(foundUserImage)
        }
      }
    }
  }

  for (let key in (req.files || {})) {
    const newFile = req.files[key][0]

    await currentUser.createUserImage({ image: newFile.location })
  }

  await currentUser.reload()

  res.status(200).json(currentUser)
}

const imageFields = [
  { name: 'UserImages[0][image]', maxCount: 1 },
  { name: 'UserImages[1][image]', maxCount: 1 },
  { name: 'UserImages[2][image]', maxCount: 1 },
  { name: 'UserImages[3][image]', maxCount: 1 },
  { name: 'UserImages[4][image]', maxCount: 1 },
  { name: 'UserImages[5][image]', maxCount: 1 }
]

module.exports = [authenticateCurrentUserByToken('json'), MulterParser.fields(imageFields), validation, checkValidation, apiMyProfileUpdate]