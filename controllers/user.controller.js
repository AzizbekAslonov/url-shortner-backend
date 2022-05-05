const { validationResult } = require('express-validator')
const ApiError = require('../helpers/ApiError')
const userService = require('../services/user.service')
const generateJwt = require('../services/token.service')

class UserController {
    async register(req, res, next) {
        try {
            // <Validation>
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw ApiError.badRequest(errors.array()[0].msg, errors.array())
            }

            const { email, password } = req.body
            const data = await userService.register(email, password)
            res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            // <Validation>
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw ApiError.badRequest(errors.array()[0].msg, errors.array())
            }

            const { email, password } = req.body
            const data = await userService.login(email, password)
            res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async getDetails(req, res) {
        const details = await userService.getDetails(req.user.id)
        res.json(details)
    }

    check(req, res, next) {
        try {
            const { id, email } = req.user
            const token = generateJwt({ id, email })

            res.json({ user: req.user, token })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()