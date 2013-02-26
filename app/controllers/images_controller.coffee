load 'application'

_ = require 'underscore'

before 'load image', ->
  compound.models.Image
    .findById(params.id)
    .exec (err, image) =>
      if err then app.handleError err
      else
          @image = image
          next()
, only: ['destroy', 'show']


action 'index', ->
    compound.models.Image.all (err, images) =>
        res.json images
        next()

action 'show', ->
    res.json @image
    next()

action 'destroy', ->
  try  
    @image.remove (err) =>
      if err
        app.errorHandler err
        res.json error: err.message
      else
        try
          app.s3.deleteImage("#{@image.stem}-#{type}.#{@image.ext}") for type in @image.types
          res.json message: 'removal scheduled to s3'
        catch err
          app.handleError err  
        next()
  catch err
    app.handleError err

action 'create', ->
  # this route is programmatically called by s3-admix
  types = _.pluck(req.params.file.scope.actions, 'suffix')
  types.push 'original'

  name = req.params.file.name.split('.')[0]
  image = new compound.models.Image
    stem: name
    ext:  req.params.file.name.split('.')[1]
    types: types # Pluck the suffix that coordinate with Imagemagick actions and save original
    tags: name.split('-') # get tags
    _job:  req.params.file._scope

  image.save (err, image)=>
    compound.app.io.sockets.emit 'image:saved', image

action 'tags' , ->
  compound.models.Image.matchesAllTags req.params.tags.split('.'), (err, images)=>
    res.json images
    next()