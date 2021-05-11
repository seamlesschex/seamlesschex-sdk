const { stringify } = require('querystring')
const { getRequest } = require('./../utils')

const list = function (query = {}) {
  return getRequest(this.apiKey).get(`/v1/check/list?${stringify(query)}`)
}

const get = function (checkId) {
  return getRequest(this.apiKey).get(`/v1/check/${checkId}`)
}

const getBankInfo = function (bank_routing) {
  return getRequest(this.apiKey).get(`/v1/check/bankinfo?bank_routing=${bank_routing}`)
}

const create = function (data = {}) {
  return getRequest(this.apiKey).post('/v1/check/create', data)
}

const update = function (data = {}) {
  return getRequest(this.apiKey).post('/v1/check/edit', data)
}

const remove = function (checkId) {
  return getRequest(this.apiKey).delete(`/v1/check/${checkId}`)
}

module.exports = {
  list,
  get,
  getBankInfo,
  create,
  update,
  void: remove
}
