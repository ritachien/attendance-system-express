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
    responses: {
      200: {
        description: '成功登入',
      },
      401: {
        description: '請先登入',
      },
      403: {
        description: '沒有操作權限',
      },
      422: {
        description: '非上班日不能打卡',
      },
      500: {
        description: 'server error',
      },
    },
  },
}
