Chaplin = require 'chaplin'
mediator = require 'mediator'

Product_Market_Surcharges = require 'models/product_market_surcharges'

module.exports = class Product_Markets extends Chaplin.Collection
  url: '/product-markets'
  model: require 'models/product_market'

  initialize: ->
    super
    @initSyncMachine()

  set_pricing: (price_points)-> @_prices = _(price_points)

  find_price_point: (id)-> return (@_prices.where _market: id)[0]

  load: ->
    if not window.cache.markets 
      @beginSync()
      $.getJSON @url, (res)=>
          @upsert_markets res
          window.cache.markets = res
          @finishSync()
    else
      @upsert_markets window.cache.markets

  upsert_markets: (markets)->
    wait = markets.length
    @reset()

    for market in markets 
      if @_prices 
        
        product_market = @find_price_point market.id
        
        if product_market 
          @merge market, product_market 
        
        else 
          @add_market market

      else
        @add_market market
  
      if --wait is 0
        mediator.publish 'markets:loaded'

  merge: (market_data, product_market)->
    # This market has already been calculated previously and saved to server
    # Insure that it is up-to-date and merge it
    market = new @model
    do (market)=>
      market.set '_market', market_data._id
      market.set 'name', market_data.name

      # must invoke new instance of Product_Market_Surcharges and not rely on model defaults
      # odd memory closure bug
      market.set 'surcharges', new Product_Market_Surcharges market_data.surcharges
     
      market.set 'active', if product_market?.active is true then true else false
      if product_market.price then market.set 'price', product_market.price

      @push market

  add_market: (attrs)->
    # the market is new, or has not been saved to this model before
    market = new @model
    do (market)=>
      market.set '_market', attrs._id
      market.set 'name', attrs.name
      # must invoke new instance of Product_Market_Surcharges and not rely on model defaults
      # odd memory closure bug
      market.set 'surcharges', new Product_Market_Surcharges attrs.surcharges
      @push market  
