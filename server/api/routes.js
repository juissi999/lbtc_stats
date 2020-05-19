const router = require('express').Router()
const handlers = require('./handlers')
const bodyParser = require('body-parser')

router.get('/trades', bodyParser.json(), handlers.getTrades)

module.exports = router
