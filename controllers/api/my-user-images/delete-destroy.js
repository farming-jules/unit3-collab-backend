const { authenticateCurrentUserByToken } = require('../../_helpers')
const getUserImageById = require('../../_helpers/my-user-images/get-user-image-by-id')

const apiMyProfileUserImageDestroy = async function(req, res) {
  const { locals: { currentUserImage } } = res

  await currentUserImage.destroy()

  res.status(204).json()
}

module.exports = [authenticateCurrentUserByToken('json'), getUserImageById, apiMyProfileUserImageDestroy]