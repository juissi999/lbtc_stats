const axios = require('axios')

exports.getRecent = () => {
  const request = axios.get(
    'https://localbitcoins.com/bitcoincharts/eur/trades.json'
  )
  return request.then((response) => response.data)
}

exports.getSell = () => {
  const request = axios.get(
    'https://localbitcoins.com/sell-bitcoins-online/eur/.json',
    { headers: { 'Content-Type': 'application/json' } }
  )
  return request.then((response) => response.data)
}
