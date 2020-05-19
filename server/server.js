const express = require('express')

const PORT = process.env.PORT || 80

const app = express()

app.use(express.static('docs'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
