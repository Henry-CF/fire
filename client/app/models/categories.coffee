Collection = require 'models/base/collection'
Category = require 'models/category'

module.exports = class Categories extends Collection
	url: '/categories'
	model: Category
	