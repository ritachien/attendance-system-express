module.exports = {
  put: {
    tags: [
      'Admin',
    ],
    summary: 'Admin 修改單筆員工資料(帳號解鎖、密碼重設)',
    description: 'Admin 修改單筆員工資料(帳號解鎖、密碼重設)',
    operationId: 'adminEditUser',
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    parameters: [
      {
        in: 'path',
        name: 'userId',
        schema: {
          type: 'string',
          example: 'A_sting_of_UUID',
        },
        required: true,
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              unlock: {
                type: 'boolean',
                example: 'true',
              },
              resetPassword: {
                type: 'boolean',
                example: 'true',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: '成功更新資料，或沒有資料需要更新',
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
