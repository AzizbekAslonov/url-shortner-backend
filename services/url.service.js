const shortid = require('shortid')
const config = require('config')

const ApiError = require("../helpers/ApiError")
const { Url } = require('../models')

class UrlService {
    static _getShortingMask(apiUrl, code) {
        return `${apiUrl}/t/${code}`
    }

    async getOne(id) {
        const link = await Url.findByPk(id)

        if (link) return link
        else throw ApiError.notFound()
    }

    async create(link, userId) {
        const existing = await Url.findOne({
            where: { link, userId }
        })
        if (existing) return existing

        const code = shortid.generate()
        const API_URL = config.get('API_URL')
        const shortLink = UrlService._getShortingMask(API_URL, code)

        const url = await Url.create({
            link, code, shortLink, userId
        })
        return url
    }

    isValid(str) {
        const res = str.match(/http(s)?:\/\/.(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    }
}

module.exports = new UrlService()