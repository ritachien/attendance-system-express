const express = require('express')
const swaggerUi = require('swagger-ui-express')
const cors = require('cors')

const swaggerOptions = require('./docs/options.config')
const swaggerDoc = require('./docs/index')
const routes = require('./routes')

const PORT = process.env.PORT || 3000
const app = express()

const corsOptions = {
  origin: [
    // production
    'https://attendace-system-vue.vercel.app',
    // dev-only: comment out when production
    // 'http://localhost:5173',
  ],
  methods: ['GET', 'POST', 'PATCH', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, swaggerOptions)
)
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`app is listening on PORT: ${PORT}`)
})
