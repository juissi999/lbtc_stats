import axios from 'axios'
const baseUrl = '/proxy'

const getRecentTrades = () => {
  const request = axios.get(`${baseUrl}/bitcoincharts/eur/trades.json`)
  return request.then((response) => response.data)
}

const getSell = () => {
  const request = axios.get(`${baseUrl}/sell-bitcoins-online/eur/.json`)
  return request.then((response) => response.data)
}

const getBuy = () => {
  const request = axios.get(`${baseUrl}/buy-bitcoins-online/eur/.json`)
  return request.then((response) => response.data)
}

export default { getSell, getBuy, getRecentTrades }
