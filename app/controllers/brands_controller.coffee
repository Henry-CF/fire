load 'application'


## ---- Before Filters ---- ##

before 'load brand', ->
  compound.models.Brand
    .findOne({ _id: params.id })
    .populate('colors')
    .populate('materials')
    .exec (err, brand) =>
      if err then app.errorHandler err
      else if brand
        @brand = brand
        next()
      else
        res.json error: 'brand not found'
, only: ['show', 'update', 'destroy']


before 'instance storage', ->
  
  @colors = body.colors
  @materials = body.materials

  body.materials = []
  body.colors = []
  next()


, only: ['update', 'create']


before 'manage materials', ->
  
  materials = @materials
  wait = materials.length
  
  if wait is 0 then next()
  for material in materials
  
    do (material)->
  
      if material._id
        compound.models.Material.findById material._id, (err, db_material)->
          if err then app.errorHandler err
          else
            db_material.set material
            db_material.save (err, material)->
              if err then app.errorHandler err else body.materials.push material._id
              if --wait is 0 then next()

      else
        new_material = new compound.models.Material(material)
        new_material.save (err, saved_material)->
          if err then errorHandler(err) else body.materials.push saved_material._id
          if --wait is 0 then next()
    
, only: ['update', 'create']


before 'manage colors', ->
  colors = @colors
  wait = colors.length
  
  if wait is 0 then next()
  
  for color in colors
  
    do (color)->
    
      if color._id
        compound.models.Color.findById color._id, (err, db_color)->
          if err then app.errorHandler err
          else
            db_color.set color
            db_color.save (err, color)->
              if err then app.errorHandler err else body.colors.push color._id
              if --wait is 0 then next()

      else
        new_color = new compound.models.Color(color)
        new_color.save (err, saved_color)->
          if err then errorHandler(err) else body.colors.push saved_color._id
          if --wait is 0 then next()

, only: ['update', 'create']

action 'index', -> compound.models.Brand.all (err, brands) -> res.json brands

action 'show', -> res.json @brand

action 'create', ->
  
  @brand = new compound.models.Brand
  @brand.set body
  @brand.save (err, brand) ->
    if err then app.errorHandler(err)
    else
      res.json brand
      next()   

action 'update', ->
  @brand.set body
  @brand.save (err, brand) ->
    if err then app.errorHandler(err)
    else
      res.json brand
      next()

action 'destroy', ->
  @brand.remove (err) =>
    if err then errorHandler(err)
    else
      res.json success: 1
      next()

action 'colors', ->
  #model.Color.destroyAll()
  compound.models.Color.all (err, colors)->
    res.json colors

action 'materials', -> 
  #model.Material.destroyAll()
  compound.models.Material.all (err, materials)->
    res.json materials
