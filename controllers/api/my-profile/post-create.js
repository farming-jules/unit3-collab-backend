const { body } = require('express-validator')
const { User } = require('../../../models')
const { UserImage } = require('../../../models')

const { authenticateCurrentUserByToken, MulterParser } = require('../../_helpers')

const permittedParams = [
  "name",
  "dateOfBirth",
  "gender",
  "sexualOrientation",
  "passion",
  "lookingFor",
  "location",
  "Bio",
  "image"
]

const validation = [
  body('name').isString().withMessage('Name must be a String').notEmpty().withMessage('Name cannot be empty'),
  body('dateOfBirth').toDate().notEmpty().withMessage('Date cannot be empty'),
  body('gender').isString().withMessage('Gender must be a String').notEmpty().withMessage('Gender cannot be empty'),
  body('sexualOrientation').isString().withMessage('Sexual Orientation must be a String').notEmpty().withMessage('Sexual Orientation cannot be empty'),
  body('passion').isString().withMessage('Passion must be a String').notEmpty().withMessage('Passion cannot be empty'),
  body('lookingFor').isString().withMessage('Looking For must be a String').notEmpty().withMessage('Looking For cannot be empty'),
  body('location').isString().withMessage('Location must be a String').notEmpty().withMessage('Location cannot be empty'),
  body('Bio').isString().withMessage('Bio must be a String').notEmpty().withMessage('Bio cannot be empty'),
  body('image').isString().notEmpty().withMessage('You need to put at least 1 image')
]

const apiMyProfileUpdate = async function(req, res) {
  const { locals: { currentUser } } = res
  const { body: userParams } = req

  const profile = await currentUser.createProduct(userParams, { fields: permittedParams })
  await profile.update({ image: req.file.location }, { fields: permittedParams })

  res.status(200).json(auction)
}

module.exports = [authenticateCurrentUserByToken('json'), MulterParser.array('image'), validation, apiMyProfileUpdate]