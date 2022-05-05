const { Router } = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const userController = require('../controllers/user.controller')
const validation = require('../helpers/validationConfig')

const router = Router()
// Registration
router.post('/register', validation.userAuth, userController.register)
// Login to account
router.post('/login', validation.userAuth, userController.login)
// Check isAuthenticated and refresh account
router.get('/check', authMiddleware, userController.check)
// Get user details
router.get('/details', authMiddleware, userController.getDetails)

module.exports = router