const { Router } = require('express')
const router = Router()
const { getUserByToken } = require('../controllers/_helpers')

router.use(getUserByToken)

router.post('/api/auth/signup',   require('../controllers/api/auth/post-signup'))                             // SIGNUP POST    /api/auth/signup
router.post('/api/auth/login',    require('../controllers/api/auth/post-login'))                              // LOGIN  GET     /api/auth/login
router.delete('/api/auth/logout', require('../controllers/api/auth/delete-logout'))                           // LOGOUT DELETE  /api/auth/logout

router.get('/api/my/profile',    require('../controllers/api/my-profile/get-show'))                           // SHOW    GET     /api/my/profile/
router.put('/api/my/profile',    require('../controllers/api/my-profile/put-update'))                         // UPDATE  PUT     /api/my/profile/
router.delete('/api/my/profile', require('../controllers/api/my-profile/delete-destroy'))                     // DESTROY DELETE  /api/my/profile/

router.post('/api/my/user-images',                require('../controllers/api/my-user-images/post-create'))            // CREATE  POST    /api/my/profile/
router.put('/api/my/user-images/:UserImageId',    require('../controllers/api/my-user-images/put-update'))             // UPDATE  PUT     /api/my/profile/
router.delete('/api/my/user-images/:UserImageId', require('../controllers/api/my-user-images/delete-destroy'))         // DESTROY DELETE  /api/my/profile/

router.get('/api/my/likes',  require('../controllers/api/my-likes/get-index'))                                // INDEX   GET     /api/my/likes
router.post('/api/my/likes', require('../controllers/api/my-likes/post-create'))                              // CREATE  POST     /api/my/likes

router.get('/api/my/matches', require('../controllers/api/my-matches/get-index'))                             // Index   GET     /api/my/matches

router.get('/api/my/recommendations', require('../controllers/api/my-recommendations/get-index'))             // Index   GET     /api/my/recommendations

// Error Response
router.use(function (req, res) {
  res.status(404).json({ message: "Sorry! API does not exist!" })
})

module.exports = router
