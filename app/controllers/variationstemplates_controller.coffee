load 'application'

before 'load variations template', ->
    compound.models.VariationsTemplate.findById params.id, (err, variationstemplate) =>
        if err then res.json error: err.message
        else if variationstemplate
            @variationstemplate = variationstemplate
            next()
        else
            res.json error: 'Template does not exist'
, only: ['show', 'edit', 'update', 'destroy']


action 'index', ->
    compound.models.VariationsTemplate.all (err, variationstemplates) =>
        res.json variationstemplates

action 'show', ->
    res.json @variationstemplate
   

action 'create', ->
    @variationstemplate = new compound.models.VariationsTemplate body
    @variationstemplate.save (err, variationstemplate) =>
        if err then app.handleError err
        else
            res.json variationstemplate
            next()
        
            

action 'update', ->
    @variationstemplate.set body
    @variationstemplate.save (err, variationstemplate) =>
        if err then app.handleError err
        else
            res.json variationstemplate
            next()

action 'destroy', ->
    @variationstemplate.remove (err) ->
        if err then app.handleError err
        else
            res.json success: 1
            next()

