const apiResponse = require('./schemas/apiResponse')

module.exports = {
  securitySchemes: {
    ApiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: '請在 TOKEN 前面加上**"Bearer "**，範例: **"Bearer YOUR_TOKEN"**',
      placeholder: '請在 TOKEN 前面加上"Bearer "，範例: Bearer YOUR_TOKEN',
    },
  },
  schemas: {
    // api response model
    apiResponse,
  },
}
