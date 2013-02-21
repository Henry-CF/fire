Controller = require 'controllers/base/controller'
mediator = require 'mediator'

Index_View = require 'views/scopes/scopes_index'
Upsert_View = require 'views/scopes/scopes_upsert'

Scopes = require 'models/scopes'
Scope = require 'models/scope'

module.exports = class ScopesController extends Controller
  initialize: ->
    super

  index: ->
    @view = new Index_View collection: new Scopes()

  update: (params)->
    @view = new Upsert_View model: new Scope(id: params.id)

  create: ->
    @view = new Upsert_View model: new Scope()