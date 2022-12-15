const express = require('express')

const PORT = process.env.PORT || 3000
const app = express()

/* eslint-disable no-console */
app.listen(PORT, () => {
  console.log(`app is listening on PORT: ${PORT}`)
})
