const resources = require('./resources')

const Seamlesschex = function (apiKey) {
  Reflect.set(this, 'apiKey', apiKey)

  const _prepareService = service => {
    return Object.keys(service).reduce((nextService, property) =>
      typeof service[property] === 'function'
        ? { ...nextService, [property]: service[property].bind(this) }
        : nextService,
      service
    )
  }

  for (const name in resources) {
    Reflect.set(this, name, _prepareService(resources[name]))
  }
}


module.exports = Seamlesschex;
module.exports.default = Seamlesschex;
