Controller = require 'controllers/base/controller'
mediator = require 'mediator'

Index_View = require 'views/markets/markets_index'
Upsert_View = require 'views/markets/markets_upsert'

Markets = require 'models/markets'
Market = require 'models/market'

module.exports = class Markets_Controller extends Controller
  initialize: ->
    super

  index: ->
    @view = new Index_View collection: new Markets()

  update: (params)->
    @view = new Upsert_View model: new Market(id: params.id)

  create: ->
    @view = new Upsert_View model: new Market()