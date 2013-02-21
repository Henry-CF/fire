Model = require 'models/base/model'

Surcharges = require 'models/surcharges'

module.exports = class Supplier extends Model
  urlRoot: '/suppliers'
  defaults:
    name: ''
    skuCode: ''
    surcharges: new Surcharges()

  initialize: ->
    super
    @initSyncMachine()

  parse: (res)->
    
    if res.surcharges 
      res.surcharges = new Surcharges res.surcharges 
    else
      delete res.surcharges

    return res

  calculate_sku_code: (new_sku = '')->
    new_sku += word[0] for word in @name.split(' ')
      
