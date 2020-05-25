const axios = require('axios')
const baseUrl = 'https://localbitcoins.com'

exports.proxy = (request, response) => {
  // forward the requests url to baseUrl/...
  const promise = axios.get(`${baseUrl}/${request.url}`)
  promise
    .then(resp => response.json(resp.data))
    .catch(err => {
      if (err.response) {
        // proxy the same error code received from server
        response.status(err.response.status).end()
      } else {
        response.status(408).end()
      }
    })
}
