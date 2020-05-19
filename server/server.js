const express = require('express')
const apiRouter = require('./api/routes.js')

const PORT = process.env.PORT || 80

const app = express()

app.use('/api', apiRouter)

app.use(express.static('docs'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
