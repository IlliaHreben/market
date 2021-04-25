class ApiError extends Error {
  constructor ({ message, code, fields }) {
    super(message || code)
    this.code = code
    this.fields = fields
  }
}

module.exports = ApiError
