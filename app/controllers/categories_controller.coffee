load 'application'


## --- Before Filters ---

before 'load category', ->
    compound.models.Category.findById params.id, (err, category) =>
        if err then res.json error: err.message
        else if category
            @category = category
            next()
        else
            res.json error: 'Category does not exist'

, only: ['show', 'edit', 'update', 'destroy']


action 'index', ->
    compound.models.Category.all (err, categories) -> res.json categories

action 'show', ->
    res.json @category


action 'create', ->
    @category = new compound.models.Category
    @category.set body
    @category.save (err, category)->
        if err then app.handleError err
        unless err
            res.json success: " #{category.name } created ", category: category
            next()


action 'update', ->
    @category.set body
    @category.save (err, category) =>
        if !err
            res.json success: "#{@category.name} were updated!", category: @category
            next()
        else
            res.json error: err.message, category: @category

action 'destroy', ->
    @category.remove (error) =>
        if error then app.clientSockets[@clientSocket].emit 'serverMessage', error: error.message
        else
            res.json success: 1
            next()