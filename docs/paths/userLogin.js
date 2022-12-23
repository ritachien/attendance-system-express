module.exports = {
  post: {
    tags: [
      'Auth',
    ],
    summary: '員工登入',
    description: '員工輸入帳號/密碼登入成功後，server 會回傳身分驗證 Token。',
    operationId: 'userLogin',
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
      403: {
        description: '密碼錯誤次數過多，帳戶鎖定。',
      },
      500: {
        description: 'server error',
      },
    },
  },
}
