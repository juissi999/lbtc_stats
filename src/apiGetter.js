import axios from 'axios'

const getRecentTrades = () => {
  const request = axios.get('/api/trades')
  return request.then((response) => response.data)
}

const getSell = () => {
  const request = axios.get('/api/sell')
  return request.then((response) => response.data)
}

export default { getSell, getRecentTrades }
