module.exports = {
  post: {
    tags: [
      'Auth',
    ],
    summary: 'Admin 登入',
    description: 'Admin 輸入帳號/密碼登入成功後，server 會回傳身分驗證 Token。',
    operationId: 'adminLogin',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              account: {
                type: 'string',
                example: 'admin',
              },
              password: {
                type: 'string',
                example: 'tiadmin',
              },
            },
            required: [
              'account',
              'password',
            ],
          },
        },
      },
    },
    responses: {
      200: {
        description: '成功登入',
      },
      401: {
        description: '帳號或密碼錯誤',
      },
      500: {
        description: 'server error',
      },
    },
  },
}
