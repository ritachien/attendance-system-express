module.exports = {
  put: {
    tags: [
      'User',
    ],
    summary: '員工修改個人資料',
    description: '員工修改個人帳號、密碼或 email。',
    operationId: 'editUser',
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              account: {
                type: 'string',
                example: 'user1',
              },
              password: {
                type: 'string',
                example: 'titaner',
              },
              passwordCheck: {
                type: 'string',
                example: 'titaner',
              },
              email: {
                type: 'string',
                example: 'user1@example.com',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: '成功更新資料',
      },
      400: {
        description: 'payload 不符合要求',
      },
      401: {
        description: '請先登入',
      },
      403: {
        description: '沒有操作權限',
      },
      404: {
        description: '找不到使用者資料',
      },
      422: {
        description: '帳號重複...等原因無法執行資料修改',
      },
      500: {
        description: 'server error',
      },
    },
  },
}
