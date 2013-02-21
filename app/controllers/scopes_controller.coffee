load 'application'

before 'load scope', ->
   
    compound.models.Scope.findById params.id, (err, scope) =>
        if err
            #app.clientSockets[@clientSocket].emit 'serverMessage', error: err.message
        else if scope
            @scope = scope
            next()
        else
            res.json error: 'Scope does not exist'

, only: ['show', 'edit', 'update', 'destroy']


action 'index', -> compound.models.Scope.all (err, scopes) -> res.json scopes

action 'show', -> res.json @scope

action 'create', ->
    @scope = new compound.models.Scope
    @scope.set body
    @scope.save (err, scope) =>
        if not err
            res.json scope
            #app.clientSockets[@clientSocket].emit 'serverMessage', success: "#{scope.name} created"
            next()
        else
            throw err

action 'update', ->
    @scope.set body
    @scope.save (err, scope) =>
        unless err
            res.json @scope
            #app.clientSockets[@clientSocket].emit 'serverMessage', success: "#{@scope.name} updated"
            
action 'destroy', ->
    @scope.remove (err) =>
        if !err
            res.json success: 1
            # app.clientSockets[@clientSocket].emit 'serverMessage', success: "#{@scope.name} destroyed"

