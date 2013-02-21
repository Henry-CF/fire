load 'application'
_ = require 'underscore'
natural = require 'natural'

before 'generate query constructs', ->
  @param = _.keys(req.query)[0]

  @results = _([])
  next()

handle_results = (results, namespace, cb)->
  
  if results.length is 0 then cb(null)
  else
    collect = []
    wait = results.length
    for result in results
      result = result.toObject()
      result.parent = namespace
      collect.push result
      if --wait is 0 then cb(collect)

before 'load brand matches', ->
  
  compound.models.Brand.search @param, (err, brands) =>
    handle_results brands, 'brands', (namespaced_results)=>
      if namespaced_results then @results.push namespaced_results
      next()

, only: ['globalQuery']

before 'load product matches', ->

  compound.models.Product.search @param, (err, products) =>

    handle_results products, 'products', (namespaced_results)=>
      if namespaced_results then @results.push namespaced_results
      next()

, only: ['globalQuery']

before 'load category matches', ->

  compound.models.Category.search @param, (err, categories) =>
    handle_results categories, 'categories', (namespaced_results)=>
      if namespaced_results then @results.push namespaced_results
      next()

, only: ['globalQuery']


action 'globalQuery', () ->

  res.json @results.flatten() 


action 'dynamicQuery', ()->
  m = req.params.model

  if m in ['category', 'brand', 'product', 'image']

    namespace = m.charAt(0).toUpperCase() + m.slice(1)
    
    compound.models[namespace].search @param, (err, results)=>
        if err
          res.json error: err.message
        else
          res.json results
          next()
  else
    res.json error: 'Invalid parameter'
    next()

