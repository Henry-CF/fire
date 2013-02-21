module.exports = (compound) ->

  express = require 'express'
  app = compound.app

  app.configure ->
    app.use(compound.assetsCompiler.init());
    app.set 'view engine', 'jade'
    app.set 'view options', complexNames: true
    app.enable 'coffee'

    app.set 'cssEngine', 'stylus'

    app.use express.static(app.root + '/client/public', maxAge: 86400000)
    app.use express.bodyParser(keepExtensions: true, uploadDir: app.root + '/tmp')
    app.use express.cookieParser 'secret'
    app.use express.session secret: 'secret'
    app.use express.methodOverride()
    app.use app.router
