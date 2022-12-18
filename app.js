const express = require('express')
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')

const swaggerDoc = yaml.load('./swagger.yaml')
const routes = require('./routes')

const PORT = process.env.PORT || 3000
const app = express()

const swaggerOptions = {
  // sort operation orders
  operationsSorter(a, b) {
    const order = {
      get: '0', post: '1', put: '2', delete: '3',
    }
    return order[a.get('method')].localeCompare(order[b.get('method')])
  },
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, swaggerOptions)
)
app.use('/', routes)

/* eslint-disable no-console */
app.listen(PORT, () => {
  console.log(`app is listening on PORT: ${PORT}`)
})
