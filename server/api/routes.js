const router = require('express').Router()
const handlers = require('./handlers')
const bodyParser = require('body-parser')

router.get('/trades', bodyParser.json(), handlers.getTrades)

router.get('/sell', bodyParser.json(), handlers.getSell)

module.exports = router
