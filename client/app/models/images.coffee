Collection = require 'models/base/collection'
Image = require 'models/image'

module.exports = class Images extends Collection
	url: '/images'
	model: Image