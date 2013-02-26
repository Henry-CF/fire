load 'sessions'

before 'setup layout variables', ->

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
