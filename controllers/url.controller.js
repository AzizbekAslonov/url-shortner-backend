const { validationResult } = require('express-validator')
const urlService = require('../services/url.service')
const ApiError = require('../helpers/ApiError')
const { Url } = require('../models')

class UrlController {
    async getUserUrls(req, res, next) {
        const links = await Url.findAll({
            where: { userId: req.user.id }
        })
        res.json(links)
    }

    async create(req, res, next) {
        try {
            // <Validation>
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw ApiError.badRequest(errors.array()[0].msg)
            }
            // req.body.link - exist
            if (!urlService.isValid(req.body.link)) {
                throw ApiError.badRequest("Noto'g'ri manzil yuborildi")
            }

            const { link } = req.body
            const url = await urlService.create(link, req.user.id)
            res.json(url)
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            // <Validation>
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw ApiError.badRequest(errors.array()[0].msg)
            }

            const { id } = req.params
            const link = await urlService.getOne(id)
            res.json(link)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UrlController()