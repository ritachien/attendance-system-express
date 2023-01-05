module.exports = {
  get: {
    tags: [
      'User',
    ],
    summary: '取得當前登入使用者打卡記錄',
    description: '傳回當前登入使用者打卡記錄(單筆/多筆)',
    operationId: 'userGetRecords',
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    parameters: [
      {
        in: 'query',
        name: 'date',
        schema: {
          type: 'string',
          example: '2023-01-06',
        },
        required: false,
      },
    ],
    responses: {
      200: {
        description: '成功取得資料',
      },
      401: {
        description: '請先登入',
      },
      404: {
        description: '找不到符合條件的資料',
      },
      500: {
        description: 'server error',
      },
    },
  },
}
