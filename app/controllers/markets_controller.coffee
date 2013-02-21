load 'application'


## --- Before Filters ---

before 'load market', ->
    compound.models.Market.findById params.id, (err, market) =>
        if err then res.json error: err.message
        else if market
            @market = market
            next()
        else
            res.json error: 'Market does not exist'

, only: ['show', 'edit', 'update', 'destroy']


action 'index', ->
    compound.models.Market.all (err, markets) -> res.json markets

action 'show', ->
    res.json @market


action 'create', ->
    @market = new compound.models.Market
    @market.set body
    @market.save (err, market)->
        unless err
            res.json succes: "#{market.name} was created", market: market
            next()


action 'update', ->
    @market.set body
    @market.save (err, market) =>
        if !err
            res.json success: "#{@market.name} was updated", market: @market
            next()
        else
            res.json error: err.message, market: @market

action 'destroy', ->
    @market.remove (err) ->
        if err then app.handleError err
        else
            res.json success: 1
            next()

action 'product_markets', ->
    compound.models.Market
        .where()
        .select('name surcharges')
        .exec (err, markets)->
            res.json markets