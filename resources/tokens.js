const { getRequest } = require('./../utils')

const create = function (data = {}) {
  return getRequest(this.apiKey).post('/v1/account/tokenization', data)
}

module.exports = {
  create
}
