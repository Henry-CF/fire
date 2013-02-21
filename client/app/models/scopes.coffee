Collection = require 'models/base/collection'

Scope = require 'models/scope'

module.exports = class Scopes extends Collection
  url: '/scopes'
  model: Scope
  