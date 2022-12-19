const express = require('express')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = require('./docs/options.config')
const swaggerDoc = require('./docs/index')
const routes = require('./routes')

const PORT = process.env.PORT || 3000
const app = express()

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
