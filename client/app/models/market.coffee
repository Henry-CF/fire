Model = require 'models/base/model'

Surcharges = require 'models/surcharges'

module.exports = class Market extends Model
  urlRoot: '/markets'
  defaults:
    name: ''
    surcharges: new Surcharges()

  initialize: ->
    super
    
  parse: (res)->
    unless res.surcharges then return res
    (if surcharge.id then delete surcharge.id) for surcharge in res.surcharges
    res.surcharges = new Surcharges(res.surcharges)
    return res


