const { Router } = require('express')
const { validationResult } = require('express-validator')

const ApiError = require('../helpers/ApiError')
const validation = require('../helpers/validationConfig')
const { Url } = require('../models')

const router = Router()
// Redirect
router.get(
    '/:code',
    validation.toRedirect,
    async (req, res, next) => {
        try {
            // <Validation>
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw ApiError.badRequest(errors.array()[0].msg)
            }

            const { code } = req.params
            const url = await Url.findOne({ where: { code } })
            if (!url) throw ApiError.badRequest()

            url.increment('clicks')
            res.redirect(url.link)
        } catch (e) {
            next(e)
        }
    })

module.exports = router