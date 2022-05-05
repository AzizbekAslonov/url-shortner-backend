module.exports = class ApiError extends Error {
   constructor(message, status, errors = []) {
      super()
      this.status = status
      this.message = message
      this.errors = errors
   }

   static badRequest(message = "Noto'g'ri malumotlar", errors) {
      return new ApiError(message, 400, errors)
   }

   static unAuthorized() {
      return new ApiError("Tizimga kirilmagan", 401)
   }

   static notFound() {
      return new ApiError("Bunday ma'lumot topilmadi", 404)
   }
}