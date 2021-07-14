const { UserImage } = require("../../../models")

module.exports = async function (req, res, next) {
  const { params: { UserImageId } } = req
  const { locals: { currentUser } } = res

  const image = await UserImage.findOne({
    where: {
      id: Number(UserImageId) || 0,
      UserId: currentUser.id
    }
  })

  if (!image) return res.status(404).json({ message: `UserImage with ID: ${UserImageId} not found` })

  res.locals.currentUserImage = image

  next()
}