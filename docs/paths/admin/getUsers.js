module.exports = {
  get: {
    tags: [
      'Admin',
    ],
    summary: 'Admin 取得所有 user 資料',
    description: 'Admin 登入成功後才可執行，server 會回傳所有 user 資料。',
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    operationId: 'adminGetUsers',
    responses: {
      200: {
        description: '取得 users 陣列',
      },
      401: {
        description: '請先登入',
      },
      403: {
        description: 'user 沒有權限',
      },
      500: {
        description: 'server error',
      },
    },
  },
}
