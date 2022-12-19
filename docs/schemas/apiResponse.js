module.exports = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      example: 'success',
    },
    message: {
      type: 'string',
      description: 'short description of request result',
    },
    data: {
      type: 'object',
      description: 'some return data if exists',
    },
  },
}
