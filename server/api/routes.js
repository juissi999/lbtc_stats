const router = require('express').Router()
const handlers = require('./handlers')
const bodyParser = require('body-parser')

router.get('*', bodyParser.json(), handlers.proxy)

module.exports = router
