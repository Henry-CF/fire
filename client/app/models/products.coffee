Collection = require 'models/base/collection'
Product = require 'models/product'

module.exports = class Products extends Collection
	url: '/products'
	model: Product
	