const axios = require('axios')
const baseUrl = 'https://localbitcoins.com'

exports.getRecent = () => {
  const request = axios.get(`${baseUrl}/bitcoincharts/eur/trades.json`)
  return request.then((response) => response.data)
}

exports.getSell = () => {
  const request = axios.get(`${baseUrl}/sell-bitcoins-online/eur/.json`)
  return request.then((response) => response.data)
}
