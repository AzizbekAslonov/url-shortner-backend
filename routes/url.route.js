const { Router } = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const urlController = require('../controllers/url.controller')
const validation = require('../helpers/validationConfig')

const router = Router()
// all user urls
router.get('/', authMiddleware, urlController.getUserUrls)
// create new url
router.post('/', authMiddleware, validation.urlCreate, urlController.create)
// get one url
router.get('/:id', authMiddleware, validation.urlGetOne, urlController.getOne)

module.exports = router