before 'setup layout variables', ->
  # Pass array returned from backbone_templates_crawler.coffee initializer
  #@tpls = app.settings.backbonetemplates

  # Set the socket.io port
  @websocketsPort = app.settings.websocketsPort

  # Set the CDN to deliver images from
  @cdn = app.settings.cdn

  # Set the base domain being served (for scripting variable)
  @domain = req.headers.host
  
  next()

, only: ['dashboard']

action 'dashboard', ()->
  render
    title: "Dashboard"


action 'test', ()->
  compound.models.Brand.where().exec (err, brands)=>
    res.json brands