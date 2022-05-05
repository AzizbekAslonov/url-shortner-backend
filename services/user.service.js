const ApiError = require('../helpers/ApiError')
const generateJwt = require('../services/token.service')
const { User, Url } = require('../models')
const { sequelize } = require('../db')

class UserService {
    async register(email, password) {
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            throw ApiError.badRequest(`'${email}' emaildan foydalanilgan`)
        }

        const user = await User.create({ email, password })

        const userDto = { id: user.id, email: user.email }
        const token = generateJwt(userDto)

        return { user: userDto, token }
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            throw ApiError.badRequest("Email yoki parol xato kiritildi")
        }
        if (password !== user.password) {
            throw ApiError.badRequest("Email yoki parol xato kiritildi")
        }

        const userDto = { id: user.id, email: user.email }
        const token = generateJwt(userDto)

        return { user: userDto, token }
    }

    async getDetails(userId) {
        const details = await Url.findOne({
            where: { userId },
            attributes: [
                [sequelize.fn('SUM', sequelize.col('clicks')), 'clicks'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'refs'],
            ]
        })
        return details
    }
}

module.exports = new UserService()