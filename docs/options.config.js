module.exports = {
  // sort operation orders
  operationsSorter: function (a, b) {
    const order = {
      get: '0',
      post: '1',
      patch: '2',
      put: '3',
    }
    return order[a.get('method')].localeCompare(order[b.get('method')])
  },
}
