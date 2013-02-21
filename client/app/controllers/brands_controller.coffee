Controller = require 'controllers/base/controller'
mediator = require 'mediator'

Index_View = require 'views/brands/brands_index'
UpdateOrCreate_View = require 'views/brands/brands_updateorcreate'

Brands = require 'models/brands'
Brand = require 'models/brand'

module.exports = class BrandsController extends Controller
	initialize: ->
		super

	index: ->
		@view = new Index_View collection: new Brands()

	update: (params)->
		@view = new UpdateOrCreate_View model: new Brand(id: params.id)

	create: ->
		@view = new UpdateOrCreate_View model: new Brand()