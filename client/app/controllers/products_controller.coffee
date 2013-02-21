Controller = require 'controllers/base/controller'
mediator = require 'mediator'

Index_View = require 'views/products/products_index'
UpdateOrCreate_View = require 'views/products/products_updateorcreate'

Products = require 'models/products'
Product = require 'models/product'

module.exports = class ProductsController extends Controller

  index: ->
    @view = new Index_View collection: new Products()

  update: (params)->
    @view = new UpdateOrCreate_View model: new Product(id: params.id)

  create: ->
    @view = new UpdateOrCreate_View model: new Product()
