action 'index', -> 
    compound.models.ProductGroup
        .where()
        .populate('_members')
        .exec (err, groups)->
            res.json groups
            next()

action 'destroy', ->
    compound.models.ProductGroup
        .where()
        .exec (err, groups)->
            wait = groups.length
            if wait is 0
                res.json error: 'no groups'
                next()
            
            for group in groups
                group.remove()

                if --wait is 0
                    res.json success: true
                    next()

            
