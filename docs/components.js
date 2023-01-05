const apiResponse = require('./schemas/apiResponse')

module.exports = {
  securitySchemes: {
    ApiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    },
  },
  schemas: {
    // api response model
    apiResponse,
  },
}
