Collection = require 'models/base/collection'

module.exports = class Markets extends Collection
  url: '/markets'
  model: require 'models/market'
  