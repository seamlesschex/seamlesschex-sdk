const axios = require('axios')
const { API_HOST, API_SANDBOX_HOST } = require('./../constants')

let instance = {}
const getAxios = (apiKey = '') => {
  if (instance[apiKey]) return instance[apiKey]

  const baseURL = apiKey.includes('_test_') ? API_SANDBOX_HOST : API_HOST
  instance[apiKey] = axios.create({ baseURL })
  instance[apiKey].interceptors.request.use(
    config => {
      if (apiKey) config.headers['Authorization'] = `Bearer ${apiKey}`

      return config
    }
  )
  instance[apiKey].interceptors.response.use(
    response => response.data
  )

  return instance[apiKey]
}

module.exports = getAxios
