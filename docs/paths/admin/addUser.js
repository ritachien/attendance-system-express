module.exports = {
  post: {
    tags: [
      'Admin',
    ],
    summary: '新增一筆 user 資料',
    description: '新增一筆 user 資料(密碼預設為 titaner)',
    operationId: 'addUser',
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
            required: [
              'account',
              'name',
              'email',
            ],
            properties: {
              account: {
                type: 'string',
                example: 'user1',
              },
              name: {
                type: 'string',
                example: '王小明',
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
      422: {
        description: '帳號重複...等原因無法執行資料修改',
      },
      500: {
        description: 'server error',
      },
    },
  },
}
