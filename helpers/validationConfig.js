const { body, param } = require('express-validator');

module.exports = {
    userAuth: [
        body('email', "Noto'g'ri email kiritilgan").isEmail(),
        body('password', "Parol uzunligi 3 dan 30 gacha bo'lishi kerak").isLength({ min: 3, max: 30 }),
    ],
    urlCreate: body('link', "Yomon so'rov, qaytadan urinib ko'ring").exists({ checkFalsy: true, checkNull: true }),
    urlGetOne: param('id', "Yomon so'rov, qaytadan urinib ko'ring").isInt(),
    toRedirect: param('code', "Yomon so'rov, qaytadan urinib ko'ring").notEmpty(),
}