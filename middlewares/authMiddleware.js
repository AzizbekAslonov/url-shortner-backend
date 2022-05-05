const config = require("config")
const jwt = require("jsonwebtoken")

const ApiError = require("../helpers/ApiError")
const { User } = require("../models")

module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') next()

    const authHeader = req.headers.authorization
    if (!authHeader) return next(ApiError.unAuthorized())

    const token = authHeader.split(' ')[1]
    if (!token) return next(ApiError.unAuthorized())

    try {
        const decoded = jwt.verify(token, config.get('SECRET_KEY'))

        const user = await User.findByPk(decoded.id)
        if (!user) return next(ApiError.unAuthorized())

        req.user = decoded
        next()
    } catch (error) {
        next(ApiError.unAuthorized())
    }
}