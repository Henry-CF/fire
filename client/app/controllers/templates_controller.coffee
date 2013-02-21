Controller = require 'controllers/base/controller'
mediator = require 'mediator'

Index_View = require 'views/templates/templates_index'
UpdateOrCreate_View = require 'views/templates/templates_updateorcreate'

Templates = require 'models/templates'
Template = require 'models/template'



module.exports = class TemplatesController extends Controller
	initialize: ->
		
	index: ->
		@view = new Index_View collection: new Templates()

	update: (params)->
		@view = new UpdateOrCreate_View model: new Template(id: params.id)

	create: ->
		@view = new UpdateOrCreate_View model: new Template()
