const express = require('express')
const swaggerUi = require('swagger-ui-express')
const cors = require('cors')

const swaggerOptions = require('./docs/options.config')
const swaggerDoc = require('./docs/index')
const routes = require('./routes')

const PORT = process.env.PORT || 3000
const app = express()

const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://attendance-system-vue.vercel.app'
  : 'http://localhost:5173'

const corsOptions = {
  origin: baseURL,
  methods: ['GET', 'POST', 'PATCH', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, { swaggerOptions })
)
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`app is listening on PORT: ${PORT}`)
})
