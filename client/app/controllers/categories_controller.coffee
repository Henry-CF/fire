Controller = require 'controllers/base/controller'
mediate = require 'mediator'

Index_View = require 'views/categories/categories_index'
UpdateOrCreate_View = require 'views/categories/categories_updateorcreate'


Categories = require 'models/categories'
Category = require 'models/category'

module.exports = class CategoriesController extends Controller
	initialize: ->

	index: ->
		@view = new Index_View collection: new Categories()

	update: (params)->
		@view = new UpdateOrCreate_View model: new Category(id: params.id)

	create: ->
		@view = new UpdateOrCreate_View model: new Category()
