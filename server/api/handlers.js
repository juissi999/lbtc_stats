const lbtcApi = require('../lbtcApiGetter')

exports.getTrades = (request, response) => {
  lbtcApi.getRecent().then((apiResponse) => {
    response.json(apiResponse)
  })
}
