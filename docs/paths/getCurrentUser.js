module.exports = {
  get: {
    tags: [
      'Auth',
    ],
    summary: '取得當前登入使用者基本資訊',
    description: '使用 TOKEN 驗證身分，並回傳 TOKEN 本人資訊',
    operationId: 'getCurrentUser',
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    responses: {
      200: {
        description: '成功取得登入者資訊',
      },
      404: {
        description: '找不到使用者資訊',
      },
      500: {
        description: 'server error',
      },
    },
  },
}
