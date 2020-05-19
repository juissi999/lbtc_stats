const lbtcApi = require('../lbtcApiGetter')

exports.getTrades = (request, response) => {
  lbtcApi.getRecent().then((apiResponse) => response.json(apiResponse))
}

exports.getSell = (request, response) => {
  lbtcApi.getSell().then((apiResponse) => response.json(apiResponse))
}
