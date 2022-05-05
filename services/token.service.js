const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (payload) {
    const secret = config.get('SECRET_KEY')
    return jwt.sign(
        payload, secret, { expiresIn: '24h' }
    )
}