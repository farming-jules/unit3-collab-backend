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
  body('bio').isString().withMessage('bio must be a String').notEmpty().withMessage('bio cannot be empty')
]

const apiMyProfileUpdate = async function(req, res) {
  const { locals: { currentUser } } = res
  const { body: { UserImages, ...userParams } } = req

  await currentUser.update(userParams, {
    fields: permittedParams
  })

  res.status(200).json(currentUser)
}

module.exports = [authenticateCurrentUserByToken('json'), MulterParser.none(), validation, checkValidation, apiMyProfileUpdate]