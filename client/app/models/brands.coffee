Collection = require 'models/base/collection'

module.exports = class Brands extends Collection
	url: '/brands'
	model: require 'models/brand'
	