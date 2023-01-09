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
        description: '成功打卡',
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
