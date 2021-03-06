const ApiError = require("../helpers/ApiError")

module.exports = function (err, req, res, next) {
   if (err instanceof ApiError) {
      return res.status(err.status).json({ message: err.message, errors: err.errors })
   }
   console.log(err);
   return res.status(500).json({ message: "Iltimos, qayta urinib ko'ring" })
}