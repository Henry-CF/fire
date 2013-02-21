module.exports = (compound) ->

  express = require 'express'
  app = compound.app

  RedisStore = require('connect-redis')(express)

  app.configure ->
    app.use(compound.assetsCompiler.init());
    app.set 'view engine', 'jade'
    app.set 'view options', complexNames: true
    app.enable 'coffee'

    app.set 'cssEngine', 'stylus'

    app.use express.static(app.root + '/client/public', maxAge: 86400000)
    app.use express.bodyParser(keepExtensions: true, uploadDir: app.root + '/tmp')
    app.use express.cookieParser 'asdfgajhfgdjshgj32g3af790as9dfakj5h2935yqjheg45i'
    app.use express.session secret: new RedisStore()
    app.use express.methodOverride()
    app.use app.router
