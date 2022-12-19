const apiResponse = require('./schemas/apiResponse')

module.exports = {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  schemas: {
    // api response model
    apiResponse,
  },
}
