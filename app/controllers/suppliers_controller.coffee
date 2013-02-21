load 'application'

before 'load supplier', ->
   
    compound.models.Supplier.findById params.id, (err, supplier) =>
        if err then app.handleError err
        else if supplier
            @supplier = supplier
            next()
        else
            res.json error: 'Supplier does not exist'

, only: ['show', 'edit', 'update', 'destroy']


action 'index', -> compound.models.Supplier.all (err, suppliers) -> res.json suppliers

action 'show', -> res.json @supplier

action 'create', ->
    @supplier = new compound.models.Supplier body
    @supplier.skuCode = body.name
    @supplier.save (err, supplier) =>
        if err then app.handleError err
        else
            res.json supplier
            next()


action 'update', ->
    @supplier.set body
    @supplier.skuCode = body.name

    console.log @supplier
    @supplier.save (err, supplier) =>
        if err then app.handleError err
        else
            res.json @supplier
            next()
            #app.clientSockets[@clientSocket].emit 'serverMessage', success: "#{@supplier.name} updated"
            
action 'destroy', ->
    @supplier.remove (err) =>
        if err then app.handleError err
        else
            res.json success: 1