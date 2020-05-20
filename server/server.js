const express = require('express')
const proxyRouter = require('./api/routes.js')

const PORT = process.env.PORT || 80

const app = express()

app.use('/proxy', proxyRouter)

app.use(express.static('docs'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
