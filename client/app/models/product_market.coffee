Model = require 'models/base/model'

mediator = require 'mediator'

Product_Market_Surcharges = require 'models/product_market_surcharges'

module.exports = class Product_Market extends Model

  defaults:
    surcharges: new Product_Market_Surcharges()
  
  initialize: ->
    super
    # object to store pricing vars we will not persist to DB
    @_pricing = {}

    # global listener for updating price
    @subscribeEvent 'pricing_data', @set_pricing_data

    @subscribeEvent "pricing_data:#{@cid}", @set_pricing_data

    # change active state
    @bind 'change:active', @fetch_pricing_data
    @bind "change:price", @calculate_profit
    @bind "change:price", @calculate_roi



  calculate_price: ->
    market_price = 0

    if @_pricing.supplier_costs is 0
        @_lastError = '[pricing] no supplier costs'
        @_valid = no
        return false;

    if @_pricing.product_cost is 0 
        @_lastError = '[pricing] no product costs'
        @_valid = no
        return false;

    # reduce market % to total percentage of a sale taken
    @_pricing.market_costs = _(@attributes.surcharges.toJSON()).pluck('cost').reduce (memo, num)-> return memo+num;
    
    market_price += @_pricing.product_cost

    market_price += @_pricing.supplier_costs

    market_price = market_price*(1+@_pricing.market_costs)

    market_price = market_price*@_pricing.markup
    
    # always have $XX.95
    market_price = Math.round(market_price)-.05

    # change valid pricing state
    @_valid = yes

    # insure that MAP pricing is followed
    if market_price > @_pricing.MAP then return market_price else return @_pricing.MAP;

  set_pricing_data: (data = {})->
    @_pricing[key] = value for key, value of data
    new_price = @calculate_price()
    if new_price
        @set 'price', new_price
    else
        @set 'price', 0    

  calculate_roi: (model, price)->
    $_total_cost = @_pricing.supplier_costs + @_pricing.product_cost + (price * @_pricing.market_costs)
    ROI = (price - $_total_cost) / $_total_cost
    @set "ROI", ROI.toFixed(2)

  calculate_profit: (model, price)->
    $_total_cost = @_pricing.supplier_costs + @_pricing.product_cost + (price * @_pricing.market_costs)
    profit = price - $_total_cost
    @set 'profit', profit.toFixed(2)

  fetch_pricing_data: -> 
    mediator.publish 'fetch_pricing_data', @cid
    @

  toJSON: ->
    super
    # clean the JSON up for saving to server
    delete @attributes.createdAt
    delete @attributes.updatedAt
    delete @attributes.surcharges
    return @attributes
