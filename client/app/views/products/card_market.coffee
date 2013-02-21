View = require 'views/_base/collection_item_view'
mediator = require 'mediator'

Surcharges_View = require 'views/products/collection_surcharges'

module.exports = class Product_Market_Card_View extends View
  template: require 'views/_templates/products/card_product_market'
  className: 'market'
  tagName: 'div'
  decay: 700

  initialize: ->
    super
    
    @delegate 'click', '.activator', @calculate_market_price

    @pass 'price', '.price'
    @pass 'ROI', '.roi'
    @pass 'profit', '.profit'

    # change the $el class to indicate it is an active market
    if @model.get('active') then @$el.toggleClass 'active'

    @subscribeEvent 'markets:loaded', @renderSurcharges

  renderSurcharges: ->
    @subview 'surcharges', new Surcharges_View
      collection: @model.get('surcharges')
      container: @$('ol.stats')

  calculate_market_price: (e)->
    if @model.fetch_pricing_data()._valid
      @swap_market_state()
    else
      mediator.publish 'message:flash', error: @model._lastError

  # Change a market from inactive to active
  swap_market_state: -> 
    if @model.get('active') is true 
      @$el.removeClass 'active' 
      @deactivate() 
    else
      @$el.addClass 'active'
      @activate()    

  activate: (e)-> @model.set 'active', true
  
  deactivate: (e)-> @model.set 'active', false