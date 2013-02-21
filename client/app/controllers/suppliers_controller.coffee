Controller = require 'controllers/base/controller'
mediate = require 'mediator'

Index_View = require 'views/suppliers/suppliers_index'
UpdateOrCreate_View = require 'views/suppliers/suppliers_updateorcreate'

Suppliers = require 'models/suppliers'
Supplier = require 'models/supplier'


module.exports = class SuppliersController extends Controller
	initialize: ->
		super

	index: ->
		@view = new Index_View collection: new Suppliers()

	update: (params)->
		@view = new UpdateOrCreate_View model: new Supplier(id: params.id)

	create: ->
		@view = new UpdateOrCreate_View model: new Supplier()
