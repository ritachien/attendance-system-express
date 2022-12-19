module.exports = {
  // sort operation orders
  operationsSorter(a, b) {
    const order = {
      get: '0', post: '1', put: '2', delete: '3',
    }
    return order[a.get('method')].localeCompare(order[b.get('method')])
  },
}
