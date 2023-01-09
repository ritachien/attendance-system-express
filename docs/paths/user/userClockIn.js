module.exports = {
  post: {
    tags: [
      'User',
    ],
    summary: '員工打上班卡',
    description: '員工打上班卡。',
    operationId: 'userClockIn',
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    requestBody: {
      description: '**position 或 qrString 必須提供其中一種。**',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              position: {
                type: 'object',
                properties: {
                  lat: {
                    type: 'integer',
                    example: 25.05599234479,
                  },
                  lng: {
                    type: 'integer',
                    example: 121.5443365400,
                  },
                },
              },
              qrString: {
                type: 'string',
                example: 'a random string generate by admin',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: '打卡成功',
      },
      401: {
        description: '請先登入',
      },
      403: {
        description: '沒有操作權限(必填欄位缺失)',
      },
      500: {
        description: 'server error',
      },
    },
  },
}
