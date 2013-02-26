load 'application'
_ = require 'underscore'


before 'load populated product', ->
    
    compound.models.Product
            .findById(params.id )
            .populate('_brand')
            .populate('_productGroup')
            .populate('_category')
            .populate('_material')
            .populate('_color')
            .populate('_supplier')
            .populate('variations')
            .populate('images')
            .exec (err, product) => 
                if err then res.json error: err.message
                else if product
                    @product = product
                    next()
                else
                    res.json error: 'Product does not exist'

, only: ['show' ]

before 'subpopulate', ->
    
    @product.loadGrandChildren (err, product)=>
        if err then res.json error: err.message
        @product = product
        next()

, only: ['show']


before 'parse variations', ->
    @variations = body.variations
    delete body.variations
    next()
, only: ['create', 'update']

before 'load product', ->
     compound.models.Product
        .findById(params.id)
        .exec (err, product) =>
            if err 
                res.json error: err.message
            else if product
                @product = product
                next()
            else
                res.json error: 'product does not exist'
, only: ['destroy', 'update']

before 'create product instance', ->
    @product = new compound.models.Product body
    next()
, only: ['create']



before 'handle variations', ->
    @product.updateVariations @variations, (err)=>
        if err 
            res.json error: err.message 
        else
            next()

, only: ['create', 'update']


action 'index', -> 
    compound.models.Product
        .where()
        .populate('_brand')
        .populate('_category')
        .populate('_productGroup')
        .populate('_material')
        .populate('_color')
        .populate('_supplier')
        .exec (err, products)->
            res.json products
            next()
        

action 'show', ->
    res.json @product
    next()

action 'create', ->
    
    @product.save (err, product)->
        if err 
            res.json error: err.message
        else
            res.json product
            next()

action 'update', ->
    
    @product.set body
   
    @product.save (err, product)->
        if err 
            res.json error: err.message
        else
            res.json product
            next()


action 'destroy', ->

    remove =  =>  
        @product.remove (err) =>
            if err then res.json error: err.message
            else
                res.json success: 'product deleted'
                next()

    compound.models.Variation.remove { _id: { $in: @product.variations  } } , (err, nRemoved)=>
        compound.models.productGroup.findOne({title: @product.title}).exec (err, group)=>
            if group
                group._members.pull @product._id
                if group._members.length is 0
                    group.remove (err)=>
                        if err then res.json error: err.message else remove()
                else
                    remove()
            else
                remove()



    
