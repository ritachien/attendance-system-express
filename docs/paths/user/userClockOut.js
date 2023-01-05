module.exports = {
  patch: {
    tags: [
      'User',
    ],
    summary: '員工打下班卡',
    description: '員工打下班卡。',
    operationId: 'userClockOut',
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    parameters: [
      {
        in: 'path',
        name: 'recordId',
        schema: {
          type: 'integer',
          example: '1',
        },
        required: true,
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
        description: '找不到相關資料',
      },
      403: {
        description: '沒有操作權限',
      },
      500: {
        description: 'server error',
      },
    },
  },
}
