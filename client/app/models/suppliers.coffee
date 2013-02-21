Collection = require 'models/base/collection'

module.exports = class Suppliers extends Collection
	url: '/suppliers'
	model: require 'models/supplier'
