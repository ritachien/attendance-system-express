module.exports = {
  get: {
    tags: [
      'Admin',
    ],
    summary: '取得新的 QRcode 字串',
    description: '取得新的登入 QRcode 字串',
    operationId: 'getCurrentUser',
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    responses: {
      200: {
        description: '取得新的 QRcode 字串',
      },
      500: {
        description: 'server error',
      },
    },
  },
}
