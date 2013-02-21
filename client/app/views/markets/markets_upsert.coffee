ModelView = require 'views/_base/model_view'

Surcharges_View = require 'views/markets/collection_surcharges'

module.exports = class MarketsUpsertView extends ModelView
  template: require 'views/_templates/markets/markets_upsert'
  tagName: 'section'
  className: 'market-upsert'

  initialize: ->
    super

  renderSubviews: ->
    @renderSurcharges()

  renderSurcharges: ->
    @subview 'surcharges_collection', new Surcharges_View
      collection: @model.get('surcharges')
      container: @$('#surcharges-container')
  

  
