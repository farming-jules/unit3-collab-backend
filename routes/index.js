const { Router } = require('express')
const router = Router()
const { getUserByToken } = require('../controllers/_helpers')

router.use(getUserByToken)

router.post('/api/auth/signup', require('../controllers/api/auth/post-signup'))                      // SIGNUP POST    /api/auth/signup
router.post('/api/auth/login', require('../controllers/api/auth/post-login'))                        // LOGIN  GET     /api/auth/login
router.delete('/api/auth/logout', require('../controllers/api/auth/delete-logout'))                  // LOGOUT DELETE  /api/auth/logout
// router.put('/api/auth/like', require('../controllers/api/my-profile/put-like'))                         // UPDATE  PUT     /api/auth/like/
// router.put('/api/auth/cross', require('../controllers/api/my-profile/put-cross'))                         // UPDATE  PUT     /api/auth/cross/


router.get('/api/my/profile', require('../controllers/api/my-profile/get-profile'))                        // GET     PUT     /api/my/profile/
router.put('/api/my/profile', require('../controllers/api/my-profile/put-update'))                         // UPDATE  PUT     /api/my/profile/
// router.delete('/api/my/profile', require('../controllers/api/my-profile/deleteaccount'))                   // DESTROY DELETE  /api/my/profile/

router.get('/api/my/likes', require('../controllers/api/my-profile/likes'))                               // Get  SHOW    /api/my/likes
router.get('/api/my/matches', require('../controllers/api/my-profile/matches'))                           // CREATE  POST    /api/my/matches
router.get('/api/my/recommendations', require('../controllers/api/my-profile/recommendations'))           // CREATE  POST    /api/my/recommendations

// Error Response
router.use(function (req, res) {
  res.status(404).json({ message: "Sorry! API does not exist!" })
})

module.exports = router
